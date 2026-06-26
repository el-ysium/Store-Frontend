export interface ProductProperty {
  color: string;
  weight: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string | ProductCategory;
  stock?: number;
  inStock?: boolean;
  rating?: number;
  properties?: ProductProperty[];
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
}