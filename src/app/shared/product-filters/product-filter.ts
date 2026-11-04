export type ProductSort = 'default' | 'priceAsc' | 'priceDesc' | 'nameAsc';

export interface ProductFilterCriteria {
  categoryName?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: ProductSort;
}

/** Returns a new list; the input is never reordered. */
export function filterProducts<T extends { name: string; price: number; categoryName: string }>(
  products: T[],
  { categoryName, minPrice, maxPrice, sort = 'default' }: ProductFilterCriteria
): T[] {
  const result = products.filter(product =>
    (!categoryName || product.categoryName === categoryName) &&
    (minPrice == null || product.price >= minPrice) &&
    (maxPrice == null || product.price <= maxPrice)
  );

  switch (sort) {
    case 'priceAsc': return result.sort((a, b) => a.price - b.price);
    case 'priceDesc': return result.sort((a, b) => b.price - a.price);
    case 'nameAsc': return result.sort((a, b) => a.name.localeCompare(b.name));
    default: return result;
  }
}

export function categoryNames(products: { categoryName: string }[]): string[] {
  return Array.from(new Set(products.map(product => product.categoryName).filter(Boolean))).sort();
}
