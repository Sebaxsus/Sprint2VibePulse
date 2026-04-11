import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { formatPrice, getDiscountPercentage, MOCK_PRODUCTS } from '../services/mockData';
import ProductGrid from '../components/catalog/ProductGrid';
import styles from './ProductDetailPage.module.css';
import { ROUTES, catalogQuery } from '../routes/paths';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));

  const related = product
    ? MOCK_PRODUCTS.filter(
        (p) => p.categoryId === product.categoryId && p.id !== product.id
      ).slice(0, 4)
    : [];

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeletonDetail}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonInfo}>
            {[80, 50, 70, 40, 100, 60].map((w, i) => (
              <div key={i} className={styles.skeletonLine} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <span className={styles.notFoundIcon}>🔍</span>
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o fue removido.</p>
          <button className={styles.backBtn} onClick={() => navigate(ROUTES.catalog)}>
            ← Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : null;
  const categoryId = product.category?.id ?? product.categoryId;

  return (
    <div className={styles.page}>
      {/* BREADCRUMB */}
      <nav className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link to={ROUTES.home}>Inicio</Link>
          <span>/</span>
          <Link to={ROUTES.catalog}>Catálogo</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={catalogQuery.byCategory(product.category.id)}>
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span>{product.name}</span>
        </div>
      </nav>

      {/* DETAIL */}
      <div className={styles.detail}>
        {/* IMAGEN */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrap}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80';
              }}
            />
            {product.badge && (
              <span className={styles.imageBadge}>{product.badge}</span>
            )}
            {discount && (
              <span className={styles.discountBadge}>-{discount}%</span>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className={styles.infoSection}>
          {product.category && (
            <button
              className={styles.categoryLink}
              onClick={() => navigate(catalogQuery.byCategory(categoryId))}
            >
              {product.category.name}
            </button>
          )}

          <h1 className={styles.productName}>{product.name}</h1>

          {product.description && (
            <p className={styles.productDescription}>{product.description}</p>
          )}

          <div className={styles.priceBlock}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <div className={styles.priceOld}>
                <span className={styles.comparePrice}>
                  {formatPrice(product.comparePrice)}
                </span>
                <span className={styles.saveBadge}>
                  Ahorras {formatPrice(product.comparePrice - product.price)}
                </span>
              </div>
            )}
          </div>

          {/* STOCK */}
          <div className={styles.stockInfo}>
            {product.stock > 10 ? (
              <span className={styles.inStock}>
                <span className={styles.stockDot} />
                En stock ({product.stock} disponibles)
              </span>
            ) : product.stock > 0 ? (
              <span className={styles.lowStock}>
                <span className={styles.stockDotWarn} />
                ¡Solo quedan {product.stock} unidades!
              </span>
            ) : (
              <span className={styles.outOfStock}>
                <span className={styles.stockDotOut} />
                Agotado
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <button
              className={styles.addToCart}
              disabled
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Disponible en Sprint 3
            </button>
            <button
              className={styles.wishlistBtn}
              aria-label="Agregar a favoritos"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* PERKS */}
          <div className={styles.perks}>
            <div className={styles.perk}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Envío rápido en 24h
            </div>
            <div className={styles.perk}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              Devoluciones gratis en 30 días
            </div>
            <div className={styles.perk}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Pago seguro garantizado
            </div>
          </div>

          <button
            className={styles.backToCatalog}
            onClick={() => navigate(ROUTES.catalog)}
          >
            ← Volver al catálogo
          </button>
        </div>
      </div>

      {/* PRODUCTOS RELACIONADOS */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedTitle}>Productos relacionados</h2>
            <ProductGrid products={related} columns={4} variant="compact" />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
