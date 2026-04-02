// API Configuration
const API_BASE_URL = "https://testrapel-api-app.azurewebsites.net/api";

// Auth Service - Handles user authentication and session management
class AuthService {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.listeners = [];
  }

  async initialize() {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("currentUser");
    if (token && userStr) {
      this.token = token;
      this.currentUser = JSON.parse(userStr);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback(this.currentUser));
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/Utilisateur/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        // Parse user from JWT token
        this.currentUser = this.parseUserFromToken(data.token);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        this.notifyListeners();
        return { success: true, user: this.currentUser };
      }
      const error = await response.text();
      return { success: false, error: error || "Identifiants incorrects" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Erreur de connexion au serveur" };
    }
  }

  parseUserFromToken(token) {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      const claims = JSON.parse(jsonPayload);
      
      const userId = claims.sub || claims.nameid || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const role = claims.role || claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'Client';
      const email = claims.email || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const username = claims.unique_name || email;
      
      return {
        id: parseInt(userId),
        username: username,
        email: email,
        role: role
      };
    } catch (e) {
      console.error("Error parsing token:", e);
      return null;
    }
  }

  async register(firstName, lastName, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/Utilisateur`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role: "Client" }),
      });
      if (response.ok) return { success: true };
      const error = await response.text();
      return { success: false, error: error || "Erreur lors de l'inscription" };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, error: "Erreur de connexion au serveur" };
    }
  }

  logout() {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    this.notifyListeners();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token && !!this.currentUser;
  }

  hasRole(role) {
    return this.currentUser?.role === role;
  }

  async updateProfile(firstName, lastName, email, password = null) {
    try {
      const body = { 
        id: this.currentUser?.id || 0,
        firstName, 
        lastName, 
        email 
      };
      if (password) body.password = password;
      const response = await fetch(`${API_BASE_URL}/Utilisateur/profile`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          this.token = data.token;
          this.currentUser = this.parseUserFromToken(data.token);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        }
        this.notifyListeners();
        return { success: true };
      }
      const error = await response.text();
      return { success: false, error };
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, error: "Erreur de mise à jour" };
    }
  }

  async deleteAccount() {
    try {
      const response = await fetch(`${API_BASE_URL}/Utilisateur/profile`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (response.ok) {
        this.logout();
        return { success: true };
      }
      return { success: false, error: "Erreur lors de la suppression" };
    } catch (error) {
      console.error("Delete account error:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async getCurrentUserDetails() {
    if (!this.currentUser) return null;
    try {
      const response = await fetch(`${API_BASE_URL}/Utilisateur/${this.currentUser.id}`, {
        headers: this.getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: this.currentUser.role
        };
      }
    } catch (e) {
      console.error("Error getting user details:", e);
    }
    return this.currentUser;
  }

  getAuthHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }
}

export const authService = new AuthService();

// Article Service
class ArticleService {
  async getByCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/Article/categorie/${categoryId}`);
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/Article/${id}`);
      if (response.ok) return await response.json();
      return null;
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/Article`);
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching all articles:", error);
      return [];
    }
  }

  async create(article) {
    try {
      const response = await fetch(`${API_BASE_URL}/Article`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(article),
      });
      if (response.ok) return { success: true, article: await response.json() };
      return { success: false, error: "Erreur lors de la création" };
    } catch (error) {
      console.error("Error creating article:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async update(id, article) {
    try {
      const response = await fetch(`${API_BASE_URL}/Article/${id}`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(article),
      });
      if (response.ok) return { success: true };
      return { success: false, error: "Erreur lors de la mise à jour" };
    } catch (error) {
      console.error("Error updating article:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/Article/${id}`, {
        method: "DELETE",
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return { success: true };
      return { success: false, error: "Erreur lors de la suppression" };
    } catch (error) {
      console.error("Error deleting article:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }
}

export const articleService = new ArticleService();

// Order Service
class OrderService {
  async createOrder(order) {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(order),
      });
      if (response.ok) return { success: true, order: await response.json() };
      const error = await response.text();
      return { success: false, error: error || "Erreur lors de la création" };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async getByTrackingCode(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders/track/${code}`);
      if (response.ok) return await response.json();
      return null;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    }
  }

  async getMyOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders/my`, {
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  }

  async getAllOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders`, {
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching all orders:", error);
      return [];
    }
  }

  async getPendingOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders/pending`, {
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching pending orders:", error);
      return [];
    }
  }

  async updateStatus(orderId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders/${orderId}/status`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (response.ok) return { success: true };
      return { success: false, error: "Erreur de mise à jour" };
    } catch (error) {
      console.error("Error updating order status:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async acceptOrder(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders/${orderId}/accept`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return { success: true };
      return { success: false, error: "Erreur d'acceptation" };
    } catch (error) {
      console.error("Error accepting order:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async markDelivered(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/Orders/${orderId}/deliver`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return { success: true };
      return { success: false, error: "Erreur de livraison" };
    } catch (error) {
      console.error("Error marking delivered:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }
}

export const orderService = new OrderService();

// Tontine Service
class TontineService {
  async createTontine(order, paymentAmount, frequency, name) {
    try {
      const response = await fetch(`${API_BASE_URL}/Tontines`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({
          orderId: order.id,
          paymentAmount,
          frequency,
          name,
          totalAmount: order.totalAmount,
        }),
      });
      if (response.ok) return { success: true, tontine: await response.json() };
      const error = await response.text();
      return { success: false, error: error || "Erreur lors de la création" };
    } catch (error) {
      console.error("Error creating tontine:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  async getMyTontines() {
    try {
      const response = await fetch(`${API_BASE_URL}/Tontines/my`, {
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching tontines:", error);
      return [];
    }
  }

  async getAllTontines() {
    try {
      const response = await fetch(`${API_BASE_URL}/Tontines`, {
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) return await response.json();
      return [];
    } catch (error) {
      console.error("Error fetching all tontines:", error);
      return [];
    }
  }

  async addPayment(tontineId, amount, paymentMethod = "TMoney") {
    try {
      const response = await fetch(`${API_BASE_URL}/Tontines/${tontineId}/payment`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({ amount, paymentMethod }),
      });
      if (response.ok) return { success: true, tontine: await response.json() };
      const error = await response.text();
      return { success: false, error: error || "Erreur de paiement" };
    } catch (error) {
      console.error("Error adding payment:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  }

  calculateRemaining(tontine) {
    const remaining = tontine.totalAmount - tontine.amountPaid;
    const paymentsLeft = Math.ceil(remaining / tontine.paymentAmount);
    return {
      remainingAmount: remaining,
      paymentsLeft,
      progress: (tontine.amountPaid / tontine.totalAmount) * 100,
    };
  }
}

export const tontineService = new TontineService();

// Paygate Service
class PaygateService {
  async initiatePayment(amount, orderId, phone, method) {
    try {
      const response = await fetch(`${API_BASE_URL}/Paygate/initiate`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({ amount, orderId, phone, paymentMethod: method }),
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, transactionId: data.transactionId, message: data.message };
      }
      const error = await response.text();
      return { success: false, error: error || "Erreur lors de l'initiation du paiement" };
    } catch (error) {
      console.error("Error initiating payment:", error);
      return { success: false, error: "Erreur de connexion au service de paiement" };
    }
  }

  async checkStatus(transactionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/Paygate/status/${transactionId}`, {
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, status: data.status, message: data.message };
      }
      return { success: false, error: "Transaction non trouvée" };
    } catch (error) {
      console.error("Error checking status:", error);
      return { success: false, error: "Erreur de vérification" };
    }
  }

  formatPhone(phone) {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("228")) return "+" + cleaned;
    if (cleaned.length === 8) return "+228" + cleaned;
    return "+" + cleaned;
  }

  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 8 || (cleaned.length === 11 && cleaned.startsWith("228"));
  }
}

export const paygateService = new PaygateService();

// Content Service
class ContentService {
  constructor() {
    this.cache = null;
    this.cacheTime = null;
    this.cacheTimeout = 5 * 60 * 1000;
  }

  async getContent() {
    if (this.cache && this.cacheTime && Date.now() - this.cacheTime < this.cacheTimeout) {
      return this.cache;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/Content`);
      if (response.ok) {
        this.cache = await response.json();
        this.cacheTime = Date.now();
        return this.cache;
      }
      return this.getDefaultContent();
    } catch (error) {
      console.error("Error fetching content:", error);
      return this.getDefaultContent();
    }
  }

  getDefaultContent() {
    return {
      home: {
        title: "Dreamer the Prince",
        subtitle: "Votre boutique de confiance au Togo",
        description: "Découvrez notre sélection de téléphones, ordinateurs et accessoires de qualité.",
      },
      aPropos: {
        title: "À Propos de Dreamer the Prince",
        content: "Dreamer the Prince est votre destination de confiance pour l'électronique au Togo.",
      },
      contact: {
        phone: "+228 XX XX XX XX",
        email: "contact@dreamertheprice.com",
        address: "Lomé, Togo",
      },
    };
  }
}

export const contentService = new ContentService();
