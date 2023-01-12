import { Rating } from './rating';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: Rating;
  category: string;
  description: string;
}
