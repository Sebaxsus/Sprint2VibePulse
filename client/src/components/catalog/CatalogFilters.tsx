import React from 'react';
import { Category, ProductFilters } from '../../types';

interface CatalogFiltersProps {
  categories: Category[];
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  totalResults: number;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  totalResults,
}) => {
  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-vp-text-muted shadow-vp-sm">
        <span className="text-lg font-bold text-vp-text">{totalResults}</span> productos encontrados
      </div>

      {/* Categorías */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-vp-text">Categorías</h3>
        <ul className="space-y-1.5">
          <li>
            <button
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                !filters.categoryId
                  ? 'bg-vp-primary/10 text-vp-primary ring-1 ring-vp-primary/30'
                  : 'text-vp-text hover:bg-gray-100'
              }`}
              onClick={() => onFilterChange({ categoryId: undefined })}
            >
              <span>Todas las categorías</span>
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-vp-text-muted">
                {totalResults}
              </span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                  filters.categoryId === cat.id
                    ? 'bg-vp-primary/10 text-vp-primary ring-1 ring-vp-primary/30'
                    : 'text-vp-text hover:bg-gray-100'
                }`}
                onClick={() => onFilterChange({ categoryId: cat.id })}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-vp-text-muted">
                    {cat.productCount}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-vp-text">Precio máximo</h3>
        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-vp-sm">
          <input
            type="range"
            min={0}
            max={5000000}
            step={50000}
            value={filters.maxPrice ?? 5000000}
            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-vp-primary"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-vp-text-muted">
            <span>$0</span>
            <span className="font-semibold text-vp-text">
              {filters.maxPrice
                ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(filters.maxPrice)
                : 'Sin límite'}
            </span>
          </div>
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-vp-text">Filtros</h3>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-vp-text shadow-vp-sm">
          <input
            type="checkbox"
            checked={filters.featured === true}
            onChange={(e) => onFilterChange({ featured: e.target.checked ? true : undefined })}
            className="accent-vp-primary"
          />
          <span>Solo productos destacados</span>
        </label>
      </div>

      {/* Limpiar */}
      {(filters.categoryId || filters.maxPrice || filters.featured) && (
        <button
          className="w-full rounded-xl border border-vp-primary/30 bg-vp-primary/10 px-4 py-2 text-sm font-semibold text-vp-primary transition hover:bg-vp-primary hover:text-white"
          onClick={() => onFilterChange({ categoryId: undefined, maxPrice: undefined, featured: undefined })}
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  );
};

export default CatalogFilters;
