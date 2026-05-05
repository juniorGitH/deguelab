import couscousBasiqueImage from "../images/CouscousBasique.jpeg";
import petitMilBasiqueImage from "../images/PetitMilBasique.jpeg";
import degueFruiterGranolaImage from "../images/DegueFruiterGranola.jpeg";
import shekerProtein from "../images/ShekerProteiner.jpeg";
import Deguefruit from "../images/Deguefruit.jpeg";
import yaourtChocolate from "../images/yaourtChocolate.jpeg";
import yaourProteine from "../images/yaourProteine.jpg";
import yaourt from "../images/yaourt.jpg";

export const degueProducts = [
  {
    id: 1,
    name: "Degue couscous basique",
    description: "Le degué traditionnel authentique.",
    price: "1000 FCFA",
    image: couscousBasiqueImage,
    category: "classique"
  },
  {
    id: 2,
    name: "Degue Petit mil basique",
    description: "Le degué traditionnel authentique.",
    price: "1000 FCFA",
    image: petitMilBasiqueImage,
    category: "classique"
  },
  {
    id: 3,
    name: "Degue Fruité Granola",
    description: "Degue fruité avec granola croustillant.",
    price: "2000 FCFA",
    image: degueFruiterGranolaImage,
    category: "fruits",
    options: [
      { name: "mil", label: "Mil" },
      { name: "couscous", label: "Couscous" }
    ]
  },
  {
    id: 4,
    name: "Degue Fruité",
    description: "Mélange fruité frais.",
    price: "1500 FCFA",
    image: Deguefruit,
    category: "fruits",
    options: [
      { name: "mil", label: "Mil" },
      { name: "couscous", label: "Couscous" }
    ]
  },
  {
    id: 5,
    name: "Shaker Proteiné",
    description: "Version protéinée pour sportifs et bodybuilders.",
    price: "1000F/1500F CFA",
    image: shekerProtein,
    category: "protein"
  },
  {
    id: 6,
    name: "Yaourt Simple",
    description: "Yaourt artisanal crémeux et équilibré.",
    price: "1000 FCFA",
    image: yaourt,
    category: "yaourt"
  },
  {
    id: 7,
    name: "Yaourt chocolaté",
    description: "Yaourt artisanal crémeux et chocolaté.",
    price: "1500 FCFA",
    image: yaourtChocolate,
    category: "yaourt"
  },
  {
    id: 8,
    name: "Salade de Fruits",
    description: "Mélange de fruits frais et colorés.",
    price: "2000 FCFA",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80",
    category: "fruits"
  },
  {
    id: 9,
    name: "Yaourt Protéiné",
    description: "Yaourt protéiné onctueux et nourrissant.",
    price: "1500 FCFA",
    image: yaourProteine,
    category: "protein"
  }
];

export const degueCategories = [
  { id: "all", name: "Tous" },
  { id: "classique", name: "Basiques" },
  { id: "fruits", name: "Fruits Mix" },
  { id: "protein", name: "Protein" },
  { id: "yaourt", name: "Yaourts" }
];

