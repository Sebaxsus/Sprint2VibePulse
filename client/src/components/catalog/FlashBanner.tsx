import styles from "../../pages/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { catalogQuery } from "../../routes/paths";

const FlashBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.flashSection}>
      <div className={styles.flashInner}>
        <div className={styles.flashText}>
          <span className={styles.flashTag}>⚡ OFERTA FLASH</span>
          <h2 className={styles.flashTitle}>
            Hasta 40% OFF en prendas urbanas
          </h2>
          <p className={styles.flashSubtitle}>
            Oferta por tiempo limitado. ¡No te la pierdas!
          </p>
        </div>

        <button
          className={styles.flashCta}
          onClick={() => navigate(catalogQuery.byCategory(1))}
        >
          Ver ofertas destacadas
        </button>
      </div>
    </section>
  );
};

export default FlashBanner;