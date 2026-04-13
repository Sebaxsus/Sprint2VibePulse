import styles from "../../pages/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES, catalogQuery } from "../../routes/paths";

interface CategoriesProps {
  categories: any[];
  loading: boolean;
}


const Categories: React.FC<CategoriesProps> = ({
  categories,
  loading,
}) => {
  const navigate = useNavigate();

  return (
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

        {loading ? (
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
                  <span className={styles.categoryCount}>
                    {cat.productCount} productos
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;