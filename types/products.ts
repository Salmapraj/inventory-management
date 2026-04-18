export interface Products {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  lowStock: number;
  productId: string;
  createdAt?: string;
  image?: string;
}