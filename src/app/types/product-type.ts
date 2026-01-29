export interface ProductProperty {
  color: string;
  weight: string;
}

export interface Product {
  id: string | number; 
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock?: boolean;
  rating?: number;
  properties?: ProductProperty[]; 
}