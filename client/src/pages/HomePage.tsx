import React, { useState, useEffect } from "react";
import { useFeaturedProducts, useCategories } from "../hooks/useProducts";
import { MOCK_PROMOTIONS } from "../services/mockData";

import Hero from "../components/catalog/Hero";
import Promotions from "../components/catalog/Promotions";
import Categories from "../components/catalog/Categories";
import FeaturedProducts from "../components/catalog/FeaturedProducts";
import FlashBanner from "../components/catalog/FlashBanner";

const HomePage: React.FC = () => {
  const { products: featuredProducts, loading: loadingFeatured } =
    useFeaturedProducts();
  const { categories, loading: loadingCats } = useCategories();

  const [activePromo, setActivePromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo((p) => (p + 1) % MOCK_PROMOTIONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Hero />

      <Promotions
        activePromo={activePromo}
        setActivePromo={setActivePromo}
      />

      <Categories
        categories={categories}
        loading={loadingCats}
      />

      <FeaturedProducts
        products={featuredProducts}
        loading={loadingFeatured}
      />

      <FlashBanner />
    </>
  );
};

export default HomePage;