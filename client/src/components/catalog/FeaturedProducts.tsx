import { Product } from '../../types';
import styles from "../../pages/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { catalogQuery } from "../../routes/paths";
import ProductGrid from "./ProductGrid";


interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
}


const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  loading,
}) => {
  const navigate = useNavigate();

  return (
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

export default FeaturedProducts;