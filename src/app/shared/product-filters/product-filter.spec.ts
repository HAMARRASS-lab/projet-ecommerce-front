import { categoryNames, filterProducts } from './product-filter';

describe('product filter', () => {
  const products = [
    { name: 'Lamp', price: 30, categoryName: 'Home' },
    { name: 'Book', price: 10, categoryName: 'Media' },
    { name: 'Desk', price: 200, categoryName: 'Home' },
  ];

  const names = (list: { name: string }[]) => list.map(product => product.name);

  it('returns everything when no criteria are set', () => {
    expect(names(filterProducts(products, {}))).toEqual(['Lamp', 'Book', 'Desk']);
  });

  it('filters by category', () => {
    expect(names(filterProducts(products, { categoryName: 'Home' }))).toEqual(['Lamp', 'Desk']);
  });

  it('includes both ends of the price range', () => {
    expect(names(filterProducts(products, { minPrice: 10, maxPrice: 30 }))).toEqual(['Lamp', 'Book']);
  });

  it('treats a price limit of 0 as a real limit', () => {
    expect(filterProducts(products, { maxPrice: 0 })).toEqual([]);
  });

  it('sorts without changing the original list', () => {
    expect(names(filterProducts(products, { sort: 'priceDesc' }))).toEqual(['Desk', 'Lamp', 'Book']);
    expect(names(filterProducts(products, { sort: 'priceAsc' }))).toEqual(['Book', 'Lamp', 'Desk']);
    expect(names(filterProducts(products, { sort: 'nameAsc' }))).toEqual(['Book', 'Desk', 'Lamp']);
    expect(names(products)).toEqual(['Lamp', 'Book', 'Desk']);
  });

  it('lists each category once, sorted', () => {
    expect(categoryNames(products)).toEqual(['Home', 'Media']);
  });
});
