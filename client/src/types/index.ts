export interface User {
  id: number;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  productCount?: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  imageUrl: string;
  stock: number;
  featured: boolean;
  badge?: string;
  categoryId: number;
  category?: Category;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ProductFilters {
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
