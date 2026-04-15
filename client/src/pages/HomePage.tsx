import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedProducts, useCategories } from '../hooks/useProducts';
import { MOCK_PROMOTIONS, formatPrice } from '../services/mockData';
import ProductGrid from '../components/catalog/ProductGrid';
import styles from './HomePage.module.css';
import { ROUTES, catalogQuery } from '../routes/paths';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products: featuredProducts, loading: loadingFeatured } = useFeaturedProducts();
  const { categories, loading: loadingCats } = useCategories();
  const [activePromo, setActivePromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo((p) => (p + 1) % MOCK_PROMOTIONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.page}>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgOrb1} />
          <div className={styles.heroBgOrb2} />
          <div className={styles.heroBgGrid} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>✦ Temporada 2025</span>
            <h1 className={styles.heroTitle}>
              Descubre lo que{' '}
              <span className={styles.heroAccent}>vibra</span>{' '}
              ahora
            </h1>
            <p className={styles.heroSubtitle}>
              Looks juveniles y accesorios con estilo urbano para cada plan de tu semana.
            </p>
            <div className={styles.heroActions}>
              <button
                className={styles.heroCta}
                onClick={() => navigate(ROUTES.catalog)}
              >
                Comprar ahora
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className={styles.heroCtaSecondary}
                onClick={() => navigate(catalogQuery.featured)}
              >
                Ver destacados
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>500+</span>
                <span className={styles.heroStatLabel}>Productos</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>6</span>
                <span className={styles.heroStatLabel}>Categorías</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>24h</span>
                <span className={styles.heroStatLabel}>Nuevos drops</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrap}>
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=85"
                alt="Productos destacados VibePulse"
                className={styles.heroImage}
              />
              <div className={styles.heroPriceTag}>
                <span className={styles.heroPriceLabel}>Chaqueta oversized denim</span>
                <span className={styles.heroPriceValue}>{formatPrice(549900)}</span>
              </div>
              <div className={styles.heroRatingTag}>
                <span>⭐ 4.9</span>
                <span className={styles.heroRatingLabel}>Más vendido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROMOTIONAL BANNER ===== */}
      <section className={styles.promoSection}>
        <div className={styles.promoTabs}>
          {MOCK_PROMOTIONS.map((promo, i) => (
            <div
              key={promo.id}
              className={`${styles.promoCard} ${i === activePromo ? styles.promoCardActive : ''}`}
              style={{ '--promo-bg': promo.bgColor } as React.CSSProperties}
              onClick={() => setActivePromo(i)}
            >
              <span className={styles.promoBadge}>{promo.badge}</span>
              <h3 className={styles.promoTitle}>{promo.title}</h3>
              <p className={styles.promoSubtitle}>{promo.subtitle}</p>
              <button
                className={styles.promoCta}
              onClick={(e) => {
                e.stopPropagation();
                navigate(promo.ctaLink);
                }}
              >
                {promo.ctaText} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORÍAS ===== */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Explora</span>
              <h2 className={styles.sectionTitle}>Categorías</h2>
            </div>
            <button
              className={styles.sectionLink}
              onClick={() => navigate(ROUTES.catalog)}
            >
              Ver todo el catálogo →
            </button>
          </div>
          {loadingCats ? (
            <div className={styles.categoriesGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.categorySkeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.categoriesGrid}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={styles.categoryCard}
                  onClick={() => navigate(catalogQuery.byCategory(cat.id))}
                >
                  <div className={styles.categoryImgWrap}>
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className={styles.categoryImg}
                      loading="lazy"
                    />
                    <div className={styles.categoryOverlay} />
                  </div>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryName}>{cat.name}</span>
                    <span className={styles.categoryCount}>{cat.productCount} productos</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== PRODUCTOS DESTACADOS ===== */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Selección</span>
              <h2 className={styles.sectionTitle}>Productos Destacados</h2>
            </div>
            <button
              className={styles.sectionLink}
              onClick={() => navigate(catalogQuery.featured)}
            >
              Ver todos →
            </button>
          </div>
          <ProductGrid
            products={featuredProducts}
            loading={loadingFeatured}
            variant="featured"
            columns={4}
            emptyMessage="No hay productos destacados en este momento."
          />
        </div>
      </section>

      {/* ===== BANNER OFERTA ESPECIAL ===== */}
      <section className={styles.flashSection}>
        <div className={styles.flashInner}>
          <div className={styles.flashText}>
            <span className={styles.flashTag}>⚡ OFERTA FLASH</span>
            <h2 className={styles.flashTitle}>Hasta 40% OFF en prendas urbanas</h2>
            <p className={styles.flashSubtitle}>Oferta por tiempo limitado. ¡No te la pierdas!</p>
          </div>
          <button
            className={styles.flashCta}
            onClick={() => navigate(catalogQuery.byCategory(1))}
          >
            Ver ofertas destacadas
          </button>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
