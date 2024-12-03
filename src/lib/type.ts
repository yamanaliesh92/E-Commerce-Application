export interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  id: number;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
}
