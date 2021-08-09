export const getCategoryPath = (category: string) =>
  `/projects?filter=${encodeURIComponent(category.toLowerCase())}&order=newest`;
