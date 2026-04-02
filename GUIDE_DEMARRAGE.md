# 🚀 GUIDE DE DÉMARRAGE RAPIDE - DEGUE LAB

## 📋 Installation

### Option 1: Utiliser les fichiers .bat (Recommandé - Simple!)

1. Double-cliquez sur `INSTALL.bat` pour installer les dépendances
2. Attendez la fin de l'installation (peut prendre 2-3 minutes)
3. Double-cliquez sur `START.bat` pour lancer le site
4. Ouvrez votre navigateur à l'adresse: `http://localhost:1234`

### Option 2: Ligne de commande

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm start

# Le site sera disponible sur http://localhost:1234
```

## 🎨 Ce qui a été transformé

### ✅ Changements principaux:

1. **Nom du projet**: "Dreamer the Prince Boutique" → "Degue Lab"
2. **Produits**: Téléphones/Ordinateurs → Degue & Yaourt
3. **Design**: Thème moderne avec gradients purple/pink/red
4. **Navigation simplifiée**: Seulement 3 pages (Accueil, Produits, À Propos)
5. **Authentification supprimée**: Plus de login/register/profil
6. **Système de commande**: Direct via WhatsApp (+228 93 73 31 50)

### 🎯 Fonctionnalités

- **Page d'accueil**: Présentation des produits phares avec CTA WhatsApp
- **Page Produits**: Catalogue complet avec filtres par catégorie
- **Page À Propos**: Histoire de Degue Lab et présentation des gammes
- **Bouton "Acheter"**: Redirige vers WhatsApp avec message pré-rempli

### 📦 Catégories de produits

1. **Classiques** 🥛 - Degue traditionnel
2. **Fruits Mix** 🍓 - Mélanges avec fruits (mangue, ananas, fraise, etc.)
3. **Protein** 💪 - Pour sportifs et bodybuilders (25-35g protéines)
4. **Yaourts** 🍨 - Nature et aux fruits
5. **Yaourt Protein** 🍌💪 - Yaourts protéinés

## 🛠️ Structure du projet

```
Emmanuel_Amela-main/
├── src/
│   ├── Components/
│   │   ├── DegueLabHome.jsx      # Page d'accueil
│   │   ├── DegueLabProducts.jsx  # Page produits
│   │   ├── DegueLabAbout.jsx     # Page à propos
│   │   ├── DegueLabNav.jsx       # Navigation
│   │   └── DegueLabFooter.jsx    # Footer
│   ├── App.jsx                   # Configuration des routes
│   ├── index.html                # HTML principal
│   └── index.css                 # Styles personnalisés
├── package.json                  # Dépendances
├── INSTALL.bat                   # Installation facile
├── START.bat                     # Démarrage facile
└── BUILD.bat                     # Build production
```

## 🎨 Personnalisation

### Modifier les produits

Ouvrez `src/Components/DegueLabHome.jsx` ou `src/Components/DegueLabProducts.jsx` et modifiez le tableau `products`:

```javascript
{
  id: 1,
  name: "Nom du produit",
  description: "Description",
  price: "1500 FCFA",
  image: "🥛", // Emoji pour l'image
  category: "classique" // ou "fruits", "protein", etc.
}
```

### Modifier le numéro WhatsApp

Le numéro actuel est: **+228 93 73 31 50**

Pour le changer, recherchez `22893733150` dans tous les fichiers et remplacez-le.

### Modifier les couleurs

Les couleurs principales sont dans `src/index.css`:
- Purple: `purple-600`, `purple-500`
- Pink: `pink-600`, `pink-500`
- Red: `red-500`

## 📱 Fonctionnement WhatsApp

Quand un utilisateur clique sur "Acheter", il est redirigé vers WhatsApp avec:

```
https://wa.me/22893733150?text=MESSAGE_PRE_REMPLI
```

Le message contient:
- Nom du produit
- Prix
- Description

## 🚀 Déploiement

### Build pour production:

```bash
npm run build
```

Les fichiers seront dans le dossier `dist/`

Vous pouvez ensuite:
- Héberger sur Netlify, Vercel, GitHub Pages
- Mettre sur un serveur web (Apache, Nginx)

## 📞 Support

Pour toute question ou modification, contactez-moi!

---

**Bon développement! 🧪🔥**
