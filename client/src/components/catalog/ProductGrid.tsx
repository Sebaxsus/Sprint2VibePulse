import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  variant?: 'default' | 'featured' | 'compact';
  columns?: 2 | 3 | 4 | 5;
}

const SkeletonCard: React.FC = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonInfo}>
      <div className={styles.skeletonLine} style={{ width: '40%', height: '10px' }} />
      <div className={styles.skeletonLine} style={{ width: '90%', height: '14px' }} />
      <div className={styles.skeletonLine} style={{ width: '70%', height: '14px' }} />
      <div className={styles.skeletonLine} style={{ width: '50%', height: '18px', marginTop: '4px' }} />
      <div className={styles.skeletonLine} style={{ width: '100%', height: '36px', borderRadius: '8px', marginTop: '6px' }} />
    </div>
  </div>
);

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  emptyMessage = 'No hay productos disponibles en este momento.',
  variant = 'default',
  columns = 4,
}) => {
  if (loading) {
    return (
      <div className={`${styles.grid} ${styles[`cols${columns}`]}`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${styles[`cols${columns}`]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
};

export default ProductGrid;
