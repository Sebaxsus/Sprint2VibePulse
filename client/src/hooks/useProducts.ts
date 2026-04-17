import { useState, useEffect, useCallback } from 'react';
import { Product, Category, ProductFilters, PaginatedResponse } from '../types';
import { productService, categoryService } from '../services/productService';

export function useProducts(initialFilters: ProductFilters = {}) {
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.getProducts(filters);
      setProducts(result);
    } catch {
      setError('Error al cargar los productos. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return { products, loading, error, filters, updateFilters, setPage, refetch: fetchProducts };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productService
      .getFeaturedProducts()
      .then(setProducts)
      .catch(() => setError('Error al cargar productos destacados'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoryService
      .getCategories()
      .then(setCategories)
      .catch(() => setError('Error al cargar categorías'))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productService
      .getProductById(id)
      .then(setProduct)
      .catch(() => setError('Producto no encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
