export interface CartProduct {
  quantity: number;
  productId: number;
}

export interface Cart {
  id: number;
  __v: number;
  date: string;
  userId: number;
  products: CartProduct[];
}
