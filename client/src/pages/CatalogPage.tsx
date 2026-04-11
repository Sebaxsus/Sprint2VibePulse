import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../hooks/useProducts';
import { ProductFilters } from '../types';
import ProductGrid from '../components/catalog/ProductGrid';
import CatalogFilters from '../components/catalog/CatalogFilters';
import styles from './CatalogPage.module.css';

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

  // Sync URL params → filters
  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    updateFilters({
      categoryId: categoryId ? Number(categoryId) : undefined,
      search: search ?? undefined,
      featured: featured === 'true' ? true : undefined,
    });
  }, [searchParams]);

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

  // Sort products client-side
  const sortedProducts = products
    ? [...products.data].sort((a, b) => {
        if (sort === 'price_asc') return a.price - b.price;
        if (sort === 'price_desc') return b.price - a.price;
        if (sort === 'newest')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      })
    : [];

  return (
    <div className={styles.page}>
      {/* BREADCRUMB */}
      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumbInner}>
          <nav className={styles.breadcrumb} aria-label="Navegación">
            <a href="/">Inicio</a>
            <span>/</span>
            <span>Catálogo</span>
            {activeCategoryName && (
              <>
                <span>/</span>
                <span>{activeCategoryName}</span>
              </>
            )}
            {filters.search && (
              <>
                <span>/</span>
                <span>"{filters.search}"</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className={styles.layout}>
        {/* SIDEBAR OVERLAY (mobile) */}
        {sidebarOpen && (
          <div
            className={styles.sidebarOverlay}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <span>Filtros</span>
            <button
              className={styles.sidebarClose}
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

        {/* MAIN CONTENT */}
        <div className={styles.content}>
          {/* TOOLBAR */}
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <button
                className={styles.filterToggle}
                onClick={() => setSidebarOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="14" y2="12" />
                  <line x1="4" y1="18" x2="10" y2="18" />
                </svg>
                Filtros
                {(filters.categoryId || filters.featured || filters.maxPrice) && (
                  <span className={styles.filterBadgeActive} />
                )}
              </button>
              <h1 className={styles.pageTitle}>
                {activeCategoryName ?? (filters.search ? `"${filters.search}"` : 'Catálogo')}
              </h1>
            </div>
            <div className={styles.toolbarRight}>
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Ordenar por"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {(filters.categoryId || filters.search || filters.featured) && (
            <div className={styles.activeFilters}>
              {filters.categoryId && (
                <span className={styles.chip}>
                  {activeCategoryName}
                  <button onClick={() => handleFilterChange({ categoryId: undefined })}>✕</button>
                </span>
              )}
              {filters.search && (
                <span className={styles.chip}>
                  Búsqueda: {filters.search}
                  <button onClick={() => handleFilterChange({ search: undefined })}>✕</button>
                </span>
              )}
              {filters.featured && (
                <span className={styles.chip}>
                  Destacados
                  <button onClick={() => handleFilterChange({ featured: undefined })}>✕</button>
                </span>
              )}
              <button
                className={styles.clearAll}
                onClick={() =>
                  handleFilterChange({ categoryId: undefined, search: undefined, featured: undefined })
                }
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className={styles.errorMsg}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* PRODUCTS GRID */}
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

          {/* PAGINATION */}
          {products && products.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={products.page === 1}
                onClick={() => setPage(products.page - 1)}
              >
                ← Anterior
              </button>
              <div className={styles.pageNumbers}>
                {Array.from({ length: products.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`${styles.pageNum} ${p === products.page ? styles.pageNumActive : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                className={styles.pageBtn}
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
  );
};

export default CatalogPage;
