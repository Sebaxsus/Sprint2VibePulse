import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  variant?: 'default' | 'featured' | 'compact';
  columns?: 2 | 3 | 4 | 5;
}

const SkeletonCard: React.FC = () => (
  <div className="overflow-hidden rounded-[12px] border border-black/10 bg-white">
    <div className="aspect-[4/3] animate-pulse bg-gray-200" />
    <div className="flex flex-col gap-2 p-4">
      <div className="h-[10px] w-2/5 animate-pulse rounded bg-gray-200" />
      <div className="h-[14px] w-[90%] animate-pulse rounded bg-gray-200" />
      <div className="h-[14px] w-[70%] animate-pulse rounded bg-gray-200" />
      <div className="mt-1 h-[18px] w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="mt-1.5 h-9 w-full animate-pulse rounded-lg bg-gray-200" />
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
  const colsClass = {
    2: 'grid-cols-2 max-[380px]:grid-cols-1',
    3: 'grid-cols-3 max-[900px]:grid-cols-2 max-[380px]:grid-cols-1',
    4: 'grid-cols-4 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[380px]:grid-cols-1',
    5: 'grid-cols-5 max-[1200px]:grid-cols-4 max-[900px]:grid-cols-2 max-[380px]:grid-cols-1',
  }[columns];

  const gridClass = `grid items-stretch gap-6 max-[560px]:gap-4 ${colsClass}`;

  const staggerClass = (index: number) => {
    const delay = Math.min(index, 5) * 40;
    return {
      animation: `gridItemIn 360ms ease ${delay}ms both`,
    } as React.CSSProperties;
  };

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <div key={i} style={staggerClass(i)}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center gap-4 px-8 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-vp-text-light">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
        <p className="max-w-md text-base text-vp-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <style>{'@keyframes gridItemIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion: reduce){*{animation:none !important;transition:none !important;}}'}</style>
      <div className={gridClass}>
        {products.map((product, index) => (
          <div key={product.id} style={staggerClass(index)}>
            <ProductCard product={product} variant={variant} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
