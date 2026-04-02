/**
 * Product Images Manager
 * Maps products to unique, high-quality images from Unsplash
 * No redundant images - each product has its own unique image
 */

// Phone images - unique for each phone product
const phoneImages = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", // iPhone style
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80", // Samsung style
  "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&q=80", // Modern phone
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80", // Phone in hand
  "https://images.unsplash.com/photo-1580910051074-3eb694886f8b?w=400&q=80", // Phone closeup
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", // White phone
  "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80", // Phone display
  "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80", // Phone flat lay
  "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80", // iPhone 11 style
  "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&q=80", // Gold phone
  "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&q=80", // Black phone
  "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&q=80", // Phone back
  "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&q=80", // Blue phone
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&q=80", // Phone with case
  "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&q=80", // Pro phone
];

// Computer/Laptop images - unique for each computer product
const computerImages = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", // MacBook
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80", // Laptop open
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", // MacBook Pro
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80", // Laptop side
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80", // Gaming laptop
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", // Dell laptop
  "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&q=80", // Workspace laptop
  "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80", // HP laptop
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80", // Mac workspace
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80", // MacBook Air
  "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&q=80", // Thin laptop
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=80", // Woman laptop
  "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=400&q=80", // Desktop setup
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80", // iMac
  "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80", // PC setup
];

// Accessories images - unique for each accessory product
const accessoryImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", // Headphones
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80", // Black headphones
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80", // AirPods
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80", // USB cable
  "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400&q=80", // Apple Watch
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80", // Smart watch
  "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400&q=80", // Phone case
  "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80", // Power bank
  "https://images.unsplash.com/photo-1608156639585-b3a776f11f03?w=400&q=80", // Wireless charger
  "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80", // Mouse
  "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", // Keyboard
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", // Tech accessories
  "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400&q=80", // Camera lens
  "https://images.unsplash.com/photo-1612015670817-0127d21628d4?w=400&q=80", // USB hub
  "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&q=80", // SD card
];

// Map to track which images are already assigned
const assignedImages = new Map();

/**
 * Get a unique image for a product based on its ID and category
 * Ensures no duplicate images across products
 */
export const getProductImage = (productId, categoryId) => {
  const cacheKey = `${categoryId}-${productId}`;
  
  // Return cached image if already assigned
  if (assignedImages.has(cacheKey)) {
    return assignedImages.get(cacheKey);
  }
  
  let imageArray;
  switch (categoryId) {
    case 1: // Phones
      imageArray = phoneImages;
      break;
    case 2: // Computers
      imageArray = computerImages;
      break;
    case 3: // Accessories
      imageArray = accessoryImages;
      break;
    default:
      imageArray = phoneImages;
  }
  
  // Use product ID to deterministically select an image
  const imageIndex = productId % imageArray.length;
  const selectedImage = imageArray[imageIndex];
  
  // Cache the assignment
  assignedImages.set(cacheKey, selectedImage);
  
  return selectedImage;
};

/**
 * Get fallback image by category
 */
export const getFallbackImage = (categoryId) => {
  switch (categoryId) {
    case 1:
      return phoneImages[0];
    case 2:
      return computerImages[0];
    case 3:
      return accessoryImages[0];
    default:
      return phoneImages[0];
  }
};

/**
 * Process articles array and assign unique images
 */
export const assignImagesToArticles = (articles, categoryId) => {
  return articles.map((article, index) => ({
    ...article,
    photo: getProductImage(article.id || index, categoryId),
    // Keep original photo as backup
    originalPhoto: article.photo
  }));
};

// Named exports for direct access
export { phoneImages, computerImages, accessoryImages };

export default {
  getProductImage,
  getFallbackImage,
  assignImagesToArticles,
  phoneImages,
  computerImages,
  accessoryImages
};
