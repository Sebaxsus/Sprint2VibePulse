import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { formatPrice, getDiscountPercentage } from '../../services/mockData';
import { ROUTES } from '../../routes/paths';
import { IMAGE_FALLBACK_SRC, setImageFallback } from '../../utils/imageFallback';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const navigate = useNavigate();

  const imageRatioClass =
    variant === 'featured'
      ? 'aspect-[16/10]'
      : variant === 'compact'
        ? 'aspect-square'
        : 'aspect-[4/3]';

  const nameClass =
    variant === 'featured'
      ? 'line-clamp-2 text-base font-semibold leading-snug text-vp-text'
      : variant === 'compact'
        ? 'line-clamp-1 text-sm font-semibold leading-snug text-vp-text'
        : 'line-clamp-2 text-[15px] font-semibold leading-snug text-vp-text';

  const infoClass =
    variant === 'compact'
      ? 'flex flex-1 flex-col gap-1 p-3'
      : 'flex flex-1 flex-col gap-1.5 p-4';

  const priceClass =
    variant === 'compact' ? 'text-sm font-bold text-vp-text' : 'text-[17px] font-bold text-vp-text';

  const ctaClass =
    variant === 'compact'
      ? 'mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-vp-secondary px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-vp-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-vp-primary focus-visible:outline-offset-2'
      : 'mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-vp-secondary px-4 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-vp-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-vp-primary focus-visible:outline-offset-2';

  const handleClick = () => {
    navigate(ROUTES.productDetail(product.id));
  };

  const discount =
    product.comparePrice
      ? getDiscountPercentage(product.price, product.comparePrice)
      : null;

  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-black/10 bg-white shadow-vp-sm transition duration-200 hover:-translate-y-1 hover:border-black/15 hover:shadow-vp-lg focus-within:-translate-y-0.5 focus-within:border-black/15 focus-within:shadow-vp-lg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={`relative overflow-hidden bg-gray-50 ${imageRatioClass}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(event) => setImageFallback(event.currentTarget, IMAGE_FALLBACK_SRC)}
        />
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1">
          {product.badge && (
            <span className="rounded bg-vp-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.5px] text-white">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="rounded bg-vp-primary px-2 py-0.5 text-[11px] font-bold text-white">-{discount}%</span>
          )}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
            ¡Últimas {product.stock} unidades!
          </span>
        )}
        <div className="absolute right-2.5 top-2.5 flex translate-x-2 flex-col gap-1.5 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-vp-text-muted shadow-vp-sm transition hover:border-vp-primary hover:bg-vp-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-vp-primary focus-visible:outline-offset-2"
            onClick={(e) => { e.stopPropagation(); }}
            aria-label="Agregar a favoritos"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={infoClass}>
        {product.category && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.8px] text-vp-primary">
            {product.category.name}
          </span>
        )}
        <h3 className={nameClass}>{product.name}</h3>
        {variant !== 'compact' && product.description && (
          <p className="line-clamp-2 text-[13px] leading-relaxed text-vp-text-muted">{product.description}</p>
        )}
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className={priceClass}>{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-[13px] text-vp-text-light line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>
        <button
          className={ctaClass}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Ver detalle
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
