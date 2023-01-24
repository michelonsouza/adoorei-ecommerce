import type { Product, Rating } from '@/models';

type ProductOrderKeys = Partial<keyof Product>;

type ProductOrderFn = (productA: Product, productB: Product) => number;

function sortProductsrating(ratingA: Rating, ratingB: Rating): number {
  if (ratingA.rate < ratingB.rate) {
    return -1;
  }

  if (ratingA.rate > ratingB.rate) {
    return 1;
  }

  return 0;
}

export function sortProductsByKey(key?: ProductOrderKeys): ProductOrderFn {
  if (!key) {
    return (_productA: Product, _productB: Product) => 1;
  }

  return (productA: Product, productB: Product): number => {
    if (key === 'rating') {
      return sortProductsrating(productA.rating, productB.rating);
    }

    if (productA[key] < productB[key]) {
      return -1;
    }

    if (productA[key] > productB[key]) {
      return 1;
    }

    return 0;
  };
}
