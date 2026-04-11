import React from 'react';
import { Category, ProductFilters } from '../../types';
import styles from './CatalogFilters.module.css';

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
    <aside className={styles.sidebar}>
      <div className={styles.resultsCount}>
        <span className={styles.count}>{totalResults}</span> productos encontrados
      </div>

      {/* Categorías */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Categorías</h3>
        <ul className={styles.filterList}>
          <li>
            <button
              className={`${styles.filterItem} ${!filters.categoryId ? styles.filterItemActive : ''}`}
              onClick={() => onFilterChange({ categoryId: undefined })}
            >
              <span>Todas las categorías</span>
              <span className={styles.filterBadge}>{totalResults}</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`${styles.filterItem} ${filters.categoryId === cat.id ? styles.filterItemActive : ''}`}
                onClick={() => onFilterChange({ categoryId: cat.id })}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className={styles.filterBadge}>{cat.productCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Precio máximo</h3>
        <div className={styles.priceRange}>
          <input
            type="range"
            min={0}
            max={5000000}
            step={50000}
            value={filters.maxPrice ?? 5000000}
            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
            className={styles.rangeInput}
          />
          <div className={styles.priceLabels}>
            <span>$0</span>
            <span className={styles.priceValue}>
              {filters.maxPrice
                ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(filters.maxPrice)
                : 'Sin límite'}
            </span>
          </div>
        </div>
      </div>

      {/* Disponibilidad */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Filtros</h3>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            checked={filters.featured === true}
            onChange={(e) => onFilterChange({ featured: e.target.checked ? true : undefined })}
          />
          <span>Solo productos destacados</span>
        </label>
      </div>

      {/* Limpiar */}
      {(filters.categoryId || filters.maxPrice || filters.featured) && (
        <button
          className={styles.clearBtn}
          onClick={() => onFilterChange({ categoryId: undefined, maxPrice: undefined, featured: undefined })}
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  );
};

export default CatalogFilters;
