import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { formatPrice, getDiscountPercentage } from '../../services/mockData';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const discount =
    product.comparePrice
      ? getDiscountPercentage(product.price, product.comparePrice)
      : null;

  return (
    <article
      className={`${styles.card} ${styles[variant]}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.imageWrap}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&q=80';
          }}
        />
        <div className={styles.badges}>
          {product.badge && (
            <span className={styles.badge}>{product.badge}</span>
          )}
          {discount && (
            <span className={styles.badgeDiscount}>-{discount}%</span>
          )}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className={styles.stockWarn}>¡Últimas {product.stock} unidades!</span>
        )}
        <div className={styles.quickActions}>
          <button
            className={styles.quickBtn}
            onClick={(e) => { e.stopPropagation(); }}
            aria-label="Agregar a favoritos"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.info}>
        {product.category && (
          <span className={styles.category}>{product.category.name}</span>
        )}
        <h3 className={styles.name}>{product.name}</h3>
        {variant !== 'compact' && product.description && (
          <p className={styles.description}>{product.description}</p>
        )}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className={styles.comparePrice}>{formatPrice(product.comparePrice)}</span>
          )}
        </div>
        <button
          className={styles.ctaBtn}
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
