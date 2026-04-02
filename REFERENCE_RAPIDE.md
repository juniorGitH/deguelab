# ⚡ RÉFÉRENCE RAPIDE - DEGUE LAB

## 🎯 COMMANDES ESSENTIELLES

```bash
# Installation
npm install

# Démarrage (développement)
npm start

# Build (production)
npm run build

# Déploiement (GitHub Pages)
npm run deploy
```

---

## 📱 WHATSAPP

**Numéro:** +228 93 73 31 50  
**Format URL:** `wa.me/22893733150?text=MESSAGE`

---

## 📂 FICHIERS PRINCIPAUX

```
DegueLabHome.jsx      → Page d'accueil
DegueLabProducts.jsx  → Page produits (15 produits)
DegueLabAbout.jsx     → Page à propos
DegueLabNav.jsx       → Navigation
DegueLabFooter.jsx    → Footer
App.jsx               → Routes
index.css             → Styles custom
```

---

## 🎨 COULEURS

```css
Purple:  #9333ea   bg-purple-600
Pink:    #ec4899   bg-pink-600
Red:     #ef4444   bg-red-500
```

---

## 🛍️ CATÉGORIES PRODUITS

```
classique        → 🥛 Degue classique
fruits           → 🍓 Mélanges fruits
protein          → 💪 Degue protéiné
yaourt           → 🍨 Yaourts
yaourt-protein   → 🍌💪 Yaourts protéinés
```

---

## 📄 ROUTES

```
/            → Accueil
/products    → Produits
/about       → À propos
/*           → Fallback (Accueil)
```

---

## 🔧 MODIFIER UN PRODUIT

```javascript
// Dans DegueLabProducts.jsx
{
  id: 1,                    // Unique
  name: "Nom Produit",      // Affiché
  description: "...",        // Description
  price: "1500 FCFA",       // Prix
  image: "🥛",              // Emoji
  category: "classique"     // Catégorie
}
```

---

## 💬 FONCTION WHATSAPP

```javascript
const handleBuy = (product) => {
  const message = `Bonjour! Je souhaite acheter:
${product.name}
Prix: ${product.price}

${product.description}`;
  
  const whatsappUrl = `https://wa.me/22893733150?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
```

---

## 🎯 CLASSES TAILWIND UTILES

```css
/* Gradients */
bg-gradient-to-r from-purple-600 to-pink-600
bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50

/* Hover effects */
hover:scale-105
hover:shadow-2xl
transition-all duration-300

/* Boutons */
rounded-full
font-bold
px-6 py-3
shadow-lg

/* Cards */
rounded-3xl
shadow-xl
overflow-hidden
```

---

## 📐 BREAKPOINTS

```css
sm:   640px   /* Mobile large */
md:   768px   /* Tablet */
lg:   1024px  /* Desktop */
xl:   1280px  /* Large desktop */
```

---

## 🚀 DÉPLOIEMENT RAPIDE

### Netlify (Drag & Drop):
1. `npm run build`
2. Glissez le dossier `dist/` sur netlify.com

### Vercel (CLI):
```bash
npm i -g vercel
vercel
```

### GitHub Pages:
```bash
npm run deploy
```

---

## 🔍 RECHERCHER/REMPLACER

### Changer le WhatsApp:
- **Chercher:** `22893733150`
- **Remplacer:** `VOTRE_NUMERO`

### Changer "Degue Lab":
- **Chercher:** `DEGUE LAB`
- **Remplacer:** `VOTRE_NOM`

### Changer l'emoji logo:
- **Chercher:** `🧪`
- **Remplacer:** Votre emoji

---

## 📚 GUIDES COMPLETS

```
00_INDEX_DOCUMENTATION.md    → Index principal
GUIDE_DEMARRAGE.md           → Démarrage
GUIDE_PERSONNALISATION.md    → Personnaliser
RECAP_TRANSFORMATIONS.md     → Changements
STRUCTURE_VISUELLE.md        → Structure
FLUX_UTILISATION.md          → Flux UX
APERCU_VISUEL.md             → Aperçus
```

---

## 🐛 DÉPANNAGE RAPIDE

### Erreur: Module not found
```bash
npm install
```

### Erreur: Port already in use
```bash
# Changez le port ou tuez le processus
```

### Hot reload ne fonctionne pas
```bash
# Redémarrez le serveur
Ctrl+C
npm start
```

### Build échoue
```bash
# Nettoyez le cache
rm -rf .parcel-cache
npm run build
```

---

## ⌨️ RACCOURCIS VS CODE

```
Ctrl+S          → Sauvegarder
Ctrl+F          → Rechercher
Ctrl+Shift+F    → Rechercher dans fichiers
Ctrl+H          → Remplacer
Ctrl+Shift+H    → Remplacer dans fichiers
Ctrl+P          → Ouvrir fichier
Ctrl+`          → Terminal
```

---

## 📦 DÉPENDANCES CLÉS

```json
"react": "^18.2.0"
"react-dom": "^18.2.0"
"react-router-dom": "^6.30.3"
"tailwindcss": "^3.3.2"
"parcel": "^2.7.0"
```

---

## 🎨 EMOJIS UTILES

```
Produits:
🥛 🍨 🍦 🍓 🥭 🍍 🫐 🍌 💪 🏋️ 🔥 ⚡

UI:
🧪 🎯 ✨ 🌟 💎 🚀 ⚡ 🔥 ❤️ 💬 📱 ✅

Business:
📍 🕐 📞 💰 🎨 🛍️ 📦 🚚
```

---

## 🌐 URLs LOCALES

```
Développement:  http://localhost:1234
Build:          ./dist/index.html
```

---

## 📝 CHECKLIST PRE-DEPLOY

```
☐ Tester toutes les pages
☐ Tester sur mobile
☐ Vérifier liens WhatsApp
☐ Vérifier images
☐ Build sans erreurs
☐ Tester le build localement
☐ Backup du code
☐ Deploy!
```

---

## 💡 TIPS

1. **Toujours sauvegarder** avant de modifier
2. **Tester en mobile** régulièrement
3. **Commiter souvent** sur Git
4. **Lire la console** pour les erreurs
5. **Utiliser les guides** complets si besoin

---

**Ce fichier = référence ultra-rapide pour développement! ⚡**
