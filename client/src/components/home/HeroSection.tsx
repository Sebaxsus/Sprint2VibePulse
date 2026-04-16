import React from 'react';
import ProductGrid from '../catalog/ProductGrid';
import { Category, Product } from '../../types';
import { formatPrice } from '../../services/mockData';
import styles from '../../pages/HomePage.module.css';
import { IMAGE_FALLBACK_SRC, setImageFallback } from '../../utils/imageFallback';

interface HeroSectionProps {
  loadingCategories: boolean;
  categoriesCount: number;
  onGoCatalog: () => void;
  onGoFeatured: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  loadingCategories,
  categoriesCount,
  onGoCatalog,
  onGoFeatured,
}) => {
  return (
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
            Descubre lo que <span className={styles.heroAccent}>vibra</span> ahora
          </h1>
          <p className={styles.heroSubtitle}>
            Looks juveniles y accesorios con estilo urbano para cada plan de tu semana.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.heroCta} onClick={onGoCatalog}>
              Comprar ahora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className={styles.heroCtaSecondary} onClick={onGoFeatured}>
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
              <span className={styles.heroStatNum}>{loadingCategories ? '--' : categoriesCount}</span>
              <span className={styles.heroStatLabel}>Categorias</span>
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
              onError={(event) => setImageFallback(event.currentTarget, IMAGE_FALLBACK_SRC)}
            />
            <div className={styles.heroPriceTag}>
              <span className={styles.heroPriceLabel}>Chaqueta oversized denim</span>
              <span className={styles.heroPriceValue}>{formatPrice(549900)}</span>
            </div>
            <div className={styles.heroRatingTag}>
              <span>⭐ 4.9</span>
              <span className={styles.heroRatingLabel}>Mas vendido</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

interface PromotionItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  bgColor: string;
  ctaText: string;
  ctaLink: string;
}

interface PromotionsSectionProps {
  promotions: PromotionItem[];
  activePromo: number;
  onSelectPromo: (index: number) => void;
  onOpenPromo: (link: string) => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  promotions,
  activePromo,
  onSelectPromo,
  onOpenPromo,
}) => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.promoTabs}>
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`${styles.promoCard} ${index === activePromo ? styles.promoCardActive : ''}`}
            style={{ '--promo-bg': promo.bgColor } as React.CSSProperties}
            onClick={() => onSelectPromo(index)}
          >
            <span className={styles.promoBadge}>{promo.badge}</span>
            <h3 className={styles.promoTitle}>{promo.title}</h3>
            <p className={styles.promoSubtitle}>{promo.subtitle}</p>
            <button
              className={styles.promoCta}
              onClick={(event) => {
                event.stopPropagation();
                onOpenPromo(promo.ctaLink);
              }}
            >
              {promo.ctaText} →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  onViewCatalog: () => void;
  onSelectCategory: (categoryId: number) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  loading,
  onViewCatalog,
  onSelectCategory,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionTag}>Explora</span>
            <h2 className={styles.sectionTitle}>Categorias</h2>
          </div>
          <button className={styles.sectionLink} onClick={onViewCatalog}>
            Ver todo el catalogo →
          </button>
        </div>
        {loading ? (
          <div className={styles.categoriesGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.categorySkeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={styles.categoryCard}
                onClick={() => onSelectCategory(category.id)}
              >
                <div className={styles.categoryImgWrap}>
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className={styles.categoryImg}
                    loading="lazy"
                    onError={(event) => setImageFallback(event.currentTarget, IMAGE_FALLBACK_SRC)}
                  />
                  <div className={styles.categoryOverlay} />
                </div>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>{category.productCount} productos</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface FeaturedSectionProps {
  products: Product[];
  loading: boolean;
  onViewFeatured: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  loading,
  onViewFeatured,
}) => {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionTag}>Seleccion</span>
            <h2 className={styles.sectionTitle}>Productos Destacados</h2>
          </div>
          <button className={styles.sectionLink} onClick={onViewFeatured}>
            Ver todos →
          </button>
        </div>
        <ProductGrid
          products={products}
          loading={loading}
          variant="featured"
          columns={4}
          emptyMessage="No hay productos destacados en este momento."
        />
      </div>
    </section>
  );
};

interface FlashSectionProps {
  onGoCaps: () => void;
}

export const FlashSection: React.FC<FlashSectionProps> = ({ onGoCaps }) => {
  return (
    <section className={styles.flashSection}>
      <div className={styles.flashInner}>
        <div className={styles.flashText}>
          <span className={styles.flashTag}>⚡ OFERTA FLASH</span>
          <h2 className={styles.flashTitle}>Hasta 25% OFF en gorras urbanas</h2>
          <p className={styles.flashSubtitle}>Modelos 59FIFTY por tiempo limitado.</p>
        </div>
        <button className={styles.flashCta} onClick={onGoCaps}>
          Ver gorras destacadas
        </button>
      </div>
    </section>
  );
};
