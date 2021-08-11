import fallback1 from "./static/images/placeholder/placeholder_1.jpg";
import fallback2 from "./static/images/placeholder/placeholder_2.jpg";
import fallback3 from "./static/images/placeholder/placeholder_3.jpg";
import fallback4 from "./static/images/placeholder/placeholder_4.jpg";
import fallback5 from "./static/images/placeholder/placeholder_5.jpg";
const fallbackImages = [fallback1, fallback2, fallback3, fallback4, fallback5];
export const useFallbackImage = () =>
  fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
export const API = "http://localhost:5000/api";
export const fallbackProjectImage =
  "https://images.unsplash.com/photo-1604966795869-8df0b4517138?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80";
export const iotaWalletAdress = "iota:123123123";
export const MainCategories = {
  community: [
    "business",
    "culture",
    "education",
    "environment",
    "events",
    "human rights",
    "wellness",
  ],
  creative: [
    "art",
    "design",
    "film",
    "games",
    "journalism",
    "performance",
    "writing",
  ],
  technology: [
    "applications",
    "green tech",
    "hardware",
    "research",
    "software",
    "websites",
  ],
};
