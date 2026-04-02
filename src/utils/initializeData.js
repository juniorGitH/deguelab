/**
 * Utilitaires pour initialiser les données du système EduConnect
 */

export const initializeData = () => {
  // Utilisateurs par défaut pour démo
  const defaultUsers = [
    {
      id: 1,
      name: "Admin EduConnect",
      email: "admin@educonnect.com",
      password: "admin",
      userType: "admin",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Jean Parent",
      email: "parent@demo.com",
      password: "parent",
      userType: "client",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Sophie Tuteure",
      email: "tuteur@demo.com",
      password: "tuteur",
      userType: "tutor",
      createdAt: new Date().toISOString()
    }
  ];

  // Initialiser les utilisateurs
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
  
  // Initialiser les sessions de cours (anciennement mentoringSessions)
  if (!localStorage.getItem('mentoringSessions')) {
    const demoSessions = [
      {
        id: 101,
        clientId: 2,
        clientName: "Jean Parent",
        topic: "Mathématiques - Algèbre",
        subject: "Mathématiques",
        level: "3ème",
        dateTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16), // Demain
        duration: "60",
        sessionType: "home",
        status: "confirmed",
        partner: "Tuteure: Sophie Martin"
      },
      {
        id: 102,
        clientId: 2,
        clientName: "Jean Parent",
        topic: "Français - Rédaction",
        subject: "Français",
        level: "4ème",
        dateTime: new Date(Date.now() + 172800000).toISOString().slice(0, 16), // Après-demain
        duration: "90",
        sessionType: "online",
        status: "pending",
        partner: "Tuteur: À confirmer"
      }
    ];
    localStorage.setItem('mentoringSessions', JSON.stringify(demoSessions));
  }
  
  // Initialiser les ressources pédagogiques
  if (!localStorage.getItem('adminResources')) {
    const demoResources = [
      {
        id: 1,
        title: "Fiche Méthode : Organiser son travail",
        description: "Conseils pratiques pour aider les collégiens à structurer leurs révisions quotidiennes.",
        type: "tutorial",
        category: "Méthodologie",
        date: new Date().toISOString(),
        author: "EduConnect",
        status: "published"
      },
      {
        id: 2,
        title: "L'essentiel de la Géométrie (4ème)",
        description: "Toutes les propriétés de Thalès et Pythagore résumées sur une page.",
        type: "snippet",
        category: "Mathématiques",
        date: new Date().toISOString(),
        author: "EduConnect",
        status: "published"
      }
    ];
    localStorage.setItem('adminResources', JSON.stringify(demoResources));
  }
};

// Fonctions utilitaires
export const getCurrentUser = () => {
  const savedUser = localStorage.getItem('currentUser');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};