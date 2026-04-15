import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../hooks/useProducts';
import { ProductFilters } from '../types';
import ProductGrid from '../components/catalog/ProductGrid';
import CatalogFilters from '../components/catalog/CatalogFilters';
import { ROUTES } from '../routes/paths';

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
];

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initialFilters: ProductFilters = {
    categoryId: searchParams.get('categoryId')
      ? Number(searchParams.get('categoryId'))
      : undefined,
    search: searchParams.get('search') ?? undefined,
    featured: searchParams.get('featured') === 'true' ? true : undefined,
    page: 1,
    limit: 12,
  };

  const { products, loading, error, filters, updateFilters, setPage } =
    useProducts(initialFilters);
  const { categories } = useCategories();

  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    updateFilters({
      categoryId: categoryId ? Number(categoryId) : undefined,
      search: search ?? undefined,
      featured: featured === 'true' ? true : undefined,
    });
  }, [searchParams, updateFilters]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    updateFilters(newFilters);
    const params = new URLSearchParams();
    const merged = { ...filters, ...newFilters };
    if (merged.categoryId) params.set('categoryId', String(merged.categoryId));
    if (merged.search) params.set('search', merged.search);
    if (merged.featured) params.set('featured', 'true');
    setSearchParams(params);
  };

  const activeCategoryName = categories.find(
    (c) => c.id === filters.categoryId
  )?.name;

  const sortedProducts = products
    ? [...products.data].sort((a, b) => {
        if (sort === 'price_asc') return a.price - b.price;
        if (sort === 'price_desc') return b.price - a.price;
        if (sort === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      })
    : [];

  return (
    <div className="bg-vp-bg">
      <div className="border-y border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-vp-text-muted" aria-label="Navegación">
            <Link to={ROUTES.home} className="transition hover:text-vp-primary">Inicio</Link>
            <span>/</span>
            <span className="font-medium text-vp-text">Catálogo</span>
            {activeCategoryName && (
              <>
                <span>/</span>
                <span className="font-medium text-vp-text">{activeCategoryName}</span>
              </>
            )}
            {filters.search && (
              <>
                <span>/</span>
                <span className="font-medium text-vp-text">"{filters.search}"</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {sidebarOpen && (
            <button
              className="fixed inset-0 z-30 bg-black/35 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar filtros"
            />
          )}

          <aside
            className={`fixed inset-y-0 left-0 z-40 w-[88%] max-w-sm overflow-y-auto bg-vp-bg p-4 shadow-2xl transition-transform lg:static lg:z-auto lg:w-auto lg:max-w-none lg:translate-x-0 lg:p-0 lg:shadow-none ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <span className="text-lg font-bold text-vp-text">Filtros</span>
              <button
                className="rounded-md p-2 text-vp-text-muted transition hover:bg-gray-100 hover:text-vp-text"
                onClick={() => setSidebarOpen(false)}
                aria-label="Cerrar filtros"
              >
                ✕
              </button>
            </div>

            <CatalogFilters
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
              totalResults={products?.total ?? 0}
            />
          </aside>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 bg-white p-3 shadow-vp-sm">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-vp-text transition hover:bg-gray-100 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="18" x2="10" y2="18" />
                  </svg>
                  Filtros
                  {(filters.categoryId || filters.featured || filters.maxPrice) && (
                    <span className="h-2 w-2 rounded-full bg-vp-primary" />
                  )}
                </button>

                <h1 className="font-display text-2xl font-bold text-vp-text sm:text-3xl">
                  {activeCategoryName ?? (filters.search ? `"${filters.search}"` : 'Catálogo')}
                </h1>
              </div>

              <select
                className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-vp-text focus:border-vp-primary focus:outline-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Ordenar por"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {(filters.categoryId || filters.search || filters.featured) && (
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white p-3 shadow-vp-sm">
                {filters.categoryId && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-vp-primary/10 px-3 py-1 text-sm text-vp-primary">
                    {activeCategoryName}
                    <button
                      onClick={() => handleFilterChange({ categoryId: undefined })}
                      className="font-bold"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {filters.search && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-vp-primary/10 px-3 py-1 text-sm text-vp-primary">
                    Búsqueda: {filters.search}
                    <button
                      onClick={() => handleFilterChange({ search: undefined })}
                      className="font-bold"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {filters.featured && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-vp-primary/10 px-3 py-1 text-sm text-vp-primary">
                    Destacados
                    <button
                      onClick={() => handleFilterChange({ featured: undefined })}
                      className="font-bold"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  className="ml-auto rounded-lg border border-vp-primary/30 px-3 py-1.5 text-sm font-semibold text-vp-primary transition hover:bg-vp-primary hover:text-white"
                  onClick={() =>
                    handleFilterChange({ categoryId: undefined, search: undefined, featured: undefined })
                  }
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <ProductGrid
              products={sortedProducts}
              loading={loading}
              columns={3}
              emptyMessage={
                filters.search
                  ? `No se encontraron productos para "${filters.search}".`
                  : 'No hay productos disponibles en esta categoría.'
              }
            />

            {products && products.totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-vp-text transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={products.page === 1}
                  onClick={() => setPage(products.page - 1)}
                >
                  ← Anterior
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  {Array.from({ length: products.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={`h-9 min-w-9 rounded-md px-2 text-sm font-semibold transition ${
                        p === products.page
                          ? 'bg-vp-primary text-white'
                          : 'border border-black/10 text-vp-text hover:bg-gray-100'
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-vp-text transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={products.page === products.totalPages}
                  onClick={() => setPage(products.page + 1)}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
