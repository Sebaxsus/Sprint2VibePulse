import React from "react";
import styles from "../../pages/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { MOCK_PROMOTIONS } from "../../services/mockData";

type Props = {
  activePromo: number;
  setActivePromo: React.Dispatch<React.SetStateAction<number>>;
};

const Promotions: React.FC<Props> = ({ activePromo, setActivePromo }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.promoSection}>
      <div className={styles.promoTabs}>
        {MOCK_PROMOTIONS.map((promo, i) => (
          <div
            key={promo.id}
            className={`${styles.promoCard} ${
              i === activePromo ? styles.promoCardActive : ""
            }`}
            style={{ "--promo-bg": promo.bgColor } as React.CSSProperties}
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
  );
};

export default Promotions;