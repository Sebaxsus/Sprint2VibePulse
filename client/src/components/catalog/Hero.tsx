import styles from "../../pages/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES, catalogQuery } from "../../routes/paths";
import { formatPrice } from "../../services/mockData";

const Hero: React.FC = () => {
  const navigate = useNavigate();

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
  );
};

export default Hero;