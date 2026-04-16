import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CategoriesSection,
  FeaturedSection,
  FlashSection,
  PromotionsSection,
} from '../components/home/HeroSection';
import HeroSection from '../components/home/HeroSection';
import { useCategories, useFeaturedProducts } from '../hooks/useProducts';
import styles from './HomePage.module.css';
import { ROUTES, catalogQuery } from '../routes/paths';
import { MOCK_PROMOTIONS } from '../services/mockData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products: featuredProducts, loading: loadingFeatured } = useFeaturedProducts();
  const { categories, loading: loadingCats } = useCategories();
  const [activePromo, setActivePromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo((previous) => (previous + 1) % MOCK_PROMOTIONS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.page}>
      <HeroSection
        loadingCategories={loadingCats}
        categoriesCount={categories.length}
        onGoCatalog={() => navigate(ROUTES.catalog)}
        onGoFeatured={() => navigate(catalogQuery.featured)}
      />

      <PromotionsSection
        promotions={MOCK_PROMOTIONS}
        activePromo={activePromo}
        onSelectPromo={setActivePromo}
        onOpenPromo={(link) => navigate(link)}
      />

      <CategoriesSection
        categories={categories}
        loading={loadingCats}
        onViewCatalog={() => navigate(ROUTES.catalog)}
        onSelectCategory={(categoryId) => navigate(catalogQuery.byCategory(categoryId))}
      />

      <FeaturedSection
        products={featuredProducts}
        loading={loadingFeatured}
        onViewFeatured={() => navigate(catalogQuery.featured)}
      />

      <FlashSection onGoCaps={() => navigate(catalogQuery.byCategory(7))} />
    </div>
  );
};

export default HomePage;
