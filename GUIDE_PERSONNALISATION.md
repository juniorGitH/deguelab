# 🎨 GUIDE DE PERSONNALISATION DEGUE LAB

## 📝 Comment personnaliser votre site facilement

---

## 1️⃣ Changer le numéro WhatsApp

**Numéro actuel:** +228 93 73 31 50

### Méthode rapide (Rechercher/Remplacer):

Dans votre éditeur de code (VS Code, Notepad++, etc.):

1. Ouvrez le dossier du projet
2. Utilisez la fonction "Rechercher dans les fichiers" (Ctrl+Shift+F)
3. Recherchez: `22893733150`
4. Remplacez par: `VOTRE_NUMERO` (sans espaces ni +)

**Exemple:** Pour le numéro +228 99 88 77 66, mettez `22899887766`

### Fichiers concernés:
- `src/Components/DegueLabHome.jsx`
- `src/Components/DegueLabNav.jsx`
- `src/Components/DegueLabFooter.jsx`
- `src/Components/DegueLabProducts.jsx`
- `src/Components/DegueLabAbout.jsx`

---

## 2️⃣ Ajouter/Modifier des produits

### Fichiers à modifier:
- **Page d'accueil:** `src/Components/DegueLabHome.jsx`
- **Page produits:** `src/Components/DegueLabProducts.jsx`

### Structure d'un produit:

```javascript
{
  id: 1,                    // Numéro unique
  name: "Nom du Produit",   // Nom affiché
  description: "...",        // Description courte
  price: "1500 FCFA",       // Prix
  image: "🥛",              // Emoji (ou URL image)
  category: "classique"     // Catégorie
}
```

### Catégories disponibles:
- `classique` - Degue classique
- `fruits` - Mélanges avec fruits
- `protein` - Produits protéinés
- `yaourt` - Yaourts nature/fruits
- `yaourt-protein` - Yaourts protéinés

### Exemple - Ajouter un nouveau produit:

Dans `DegueLabProducts.jsx`, trouvez le tableau `products` et ajoutez:

```javascript
{
  id: 16,
  name: "Degue Caramel Beurre Salé",
  description: "Délicieux mélange gourmand au caramel",
  price: "2500 FCFA",
  image: "🍮",
  category: "classique"
}
```

---

## 3️⃣ Modifier les couleurs

### Fichier: `src/index.css`

Les couleurs principales sont définies dans les gradients:

```css
/* Purple to Pink */
.gradient-primary {
  @apply bg-gradient-to-r from-purple-600 to-pink-600;
}

/* Purple to Pink to Red */
.gradient-degue {
  @apply bg-gradient-to-r from-purple-600 via-pink-500 to-red-500;
}
```

### Pour changer les couleurs:

**Exemple - Passer à Bleu/Vert:**

```css
.gradient-primary {
  @apply bg-gradient-to-r from-blue-600 to-green-600;
}
```

### Couleurs Tailwind disponibles:
- `blue-500`, `blue-600`, `blue-700`
- `green-500`, `green-600`, `green-700`
- `red-500`, `red-600`, `red-700`
- `yellow-500`, `yellow-600`, `yellow-700`
- `indigo-500`, `indigo-600`, `indigo-700`
- `pink-500`, `pink-600`, `pink-700`
- `purple-500`, `purple-600`, `purple-700`

---

## 4️⃣ Modifier le logo et le nom

### Nom du site: "DEGUE LAB"

**Fichiers à modifier:**
- `src/Components/DegueLabNav.jsx` (ligne avec "DEGUE LAB")
- `src/Components/DegueLabFooter.jsx` (ligne avec "DEGUE LAB")
- `src/index.html` (balise `<title>`)

### Emoji du logo: 🧪

**Fichiers à modifier:**
- `src/Components/DegueLabNav.jsx` (ligne avec emoji)
- `src/Components/DegueLabFooter.jsx` (ligne avec emoji)

**Exemples d'emojis alternatifs:**
- 🍨 (Glace)
- 🥄 (Cuillère)
- 🍓 (Fraise)
- 🥛 (Lait)
- 🧃 (Jus)

---

## 5️⃣ Modifier les textes

### Slogan principal

**Fichier:** `src/Components/DegueLabHome.jsx`

Cherchez:
```jsx
<p className="text-xl md:text-2xl font-medium mb-8 max-w-3xl mx-auto">
  L'expérience ultime du degue & yaourt artisanal 🔥
</p>
```

Remplacez par votre texte!

### Tags/badges

Cherchez:
```jsx
<span className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-semibold">
  🍓 Mélanges de fruits exotiques
</span>
```

---

## 6️⃣ Ajouter des images réelles

Actuellement, les produits utilisent des emojis (🥛🍓💪). Pour utiliser de vraies photos:

### 1. Ajoutez vos images dans `src/images/`

Exemple:
- `src/images/degue-classique.jpg`
- `src/images/degue-mangue.jpg`

### 2. Modifiez le code

**Avant (emoji):**
```jsx
<span className="text-7xl">{product.image}</span>
```

**Après (image):**
```jsx
<img 
  src={product.image} 
  alt={product.name}
  className="w-full h-full object-cover"
/>
```

**Dans le tableau products:**
```javascript
{
  image: "/images/degue-classique.jpg",  // Au lieu de "🥛"
}
```

---

## 7️⃣ Modifier les horaires et adresse

**Fichier:** `src/Components/DegueLabFooter.jsx`

Cherchez:
```jsx
<span>🕐</span>
<span>Lun - Sam: 8h - 20h</span>
```

```jsx
<span>📍</span>
<span>Lomé, Togo</span>
```

Remplacez par vos informations!

---

## 8️⃣ Ajouter des réseaux sociaux

**Fichier:** `src/Components/DegueLabFooter.jsx`

Ajoutez dans la section réseaux sociaux:

```jsx
<a 
  href="https://facebook.com/deguelab" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="text-3xl hover:scale-110 transform transition-transform duration-300"
>
  📘
</a>
<a 
  href="https://instagram.com/deguelab" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="text-3xl hover:scale-110 transform transition-transform duration-300"
>
  📸
</a>
```

---

## 9️⃣ Personnaliser le message WhatsApp

**Fichier:** `src/Components/DegueLabProducts.jsx`

Dans la fonction `handleBuy`:

```javascript
const message = `Bonjour! Je souhaite acheter:\n\n${product.name}\nPrix: ${product.price}\n\n${product.description}`;
```

**Personnalisez le texte:**

```javascript
const message = `Salut Degue Lab! 👋\n\nJe veux commander:\n📦 ${product.name}\n💰 ${product.price}\n\nMerci!`;
```

---

## 🔟 Modifier les animations

**Fichier:** `tailwind.config.js`

Ajoutez de nouvelles animations:

```javascript
animation: {
  'bounce-slow': 'bounce 2s infinite',
  'spin-slow': 'spin 3s linear infinite',
}
```

Utilisez-les dans vos composants:

```jsx
<div className="animate-bounce-slow">🔥</div>
```

---

## 🎯 Astuces rapides

### 1. Émojis utiles pour les produits:
- 🥛 🍨 🍦 - Produits laitiers
- 🍓 🥭 🍍 🫐 🍌 - Fruits
- 💪 🏋️ 🔥 ⚡ - Fitness/Protein
- ✨ 🌟 💎 - Premium/Spécial

### 2. Tester vos modifications:
```bash
# Lancez le serveur
npm start

# Le site se recharge automatiquement à chaque modification!
```

### 3. Backup avant modification:
Faites toujours une copie du dossier avant de faire de gros changements!

---

## 🆘 En cas de problème

### Le site ne démarre pas:
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
```

### Les couleurs ne s'affichent pas:
- Vérifiez que Tailwind est bien configuré
- Relancez le serveur (npm start)

### Le bouton WhatsApp ne fonctionne pas:
- Vérifiez le numéro (format: 22893733150 sans + ni espaces)
- Testez le lien directement dans le navigateur

---

**Bonne personnalisation! 🎨🚀**

Si vous avez besoin d'aide, consultez le `GUIDE_DEMARRAGE.md`
