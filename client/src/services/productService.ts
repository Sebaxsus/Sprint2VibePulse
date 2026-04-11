import { Product, Category, ProductFilters, PaginatedResponse, ApiResponse } from '../types';
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
} from './mockData';

const SIMULATE_DELAY = 300;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    await delay(SIMULATE_DELAY);

    let filtered = [...MOCK_PRODUCTS];

    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter((p) => p.featured === filters.featured);
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, page, limit, totalPages };
  },

  async getProductById(id: number): Promise<Product | null> {
    await delay(SIMULATE_DELAY);
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(SIMULATE_DELAY);
    return MOCK_PRODUCTS.filter((p) => p.featured);
  },
};

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(SIMULATE_DELAY);
    return MOCK_CATEGORIES;
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await delay(SIMULATE_DELAY);
    return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
  },
};
