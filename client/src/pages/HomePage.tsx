import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedProducts, useCategories } from '../hooks/useProducts';
import { MOCK_PROMOTIONS, formatPrice } from '../services/mockData';
import ProductGrid from '../components/catalog/ProductGrid';
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
    <div className="overflow-x-hidden bg-vp-bg">
      <section className="relative flex min-h-[calc(100vh-68px)] items-center overflow-hidden bg-vp-secondary">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-52 right-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,71,87,0.18)_0%,transparent_70%)]" />
          <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,165,2,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-5">
            <span className="inline-block w-fit rounded-full border border-vp-primary/30 bg-vp-primary/15 px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-vp-primary">
              ✦ Temporada 2025
            </span>

            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Descubre lo que <span className="relative inline-block text-vp-primary">vibra<span className="absolute bottom-0 left-0 right-0 h-1 rounded opacity-40 bg-vp-primary" /></span> ahora
            </h1>

            <p className="max-w-[520px] text-[17px] leading-relaxed text-white/75">
              Looks juveniles y accesorios con estilo urbano para cada plan de tu semana.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full bg-vp-primary px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(255,71,87,0.4)] transition hover:-translate-y-0.5 hover:bg-vp-primary/90"
                onClick={() => navigate(ROUTES.catalog)}
              >
                Comprar ahora
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                onClick={() => navigate(catalogQuery.featured)}
              >
                Ver destacados
              </button>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-extrabold text-white">500+</span>
                <span className="text-xs text-white/60">Productos</span>
              </div>
<<<<<<< HEAD
              <div className="h-9 w-px bg-white/20" />
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-extrabold text-white">{loadingCats ? '--' : categories.length}</span>
                <span className="text-xs text-white/60">Categorías</span>
              </div>
              <div className="h-9 w-px bg-white/20" />
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-extrabold text-white">24h</span>
                <span className="text-xs text-white/60">Nuevos drops</span>
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-[520px]">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=85"
                alt="Productos destacados VibePulse"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
              />
              <div className="absolute -bottom-4 -left-4 flex flex-col gap-0.5 rounded-2xl bg-white px-4 py-3 shadow-vp-lg">
                <span className="text-xs text-vp-text-muted">Chaqueta oversized denim</span>
                <span className="text-lg font-extrabold text-vp-text">{formatPrice(549900)}</span>
              </div>
              <div className="absolute -right-4 -top-4 flex flex-col gap-0.5 rounded-2xl bg-vp-accent px-4 py-2.5 shadow-[0_4px_16px_rgba(255,165,2,0.4)]">
                <span className="text-[15px] font-bold text-amber-900">⭐ 4.9</span>
                <span className="text-[11px] font-semibold text-amber-900/80">Más vendido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {MOCK_PROMOTIONS.map((promo, i) => (
            <div
              key={promo.id}
              className={`cursor-pointer rounded-[20px] border-2 p-7 transition ${
                i === activePromo
                  ? 'translate-y-[-4px] border-white/30 opacity-100 shadow-[0_12px_32px_rgba(0,0,0,0.2)]'
                  : 'border-transparent opacity-80 hover:translate-y-[-4px] hover:opacity-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]'
              }`}
              style={{ backgroundColor: promo.bgColor }}
              onClick={() => setActivePromo(i)}
            >
              <span className="mb-3 inline-block rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-[1px] text-white/90">
                {promo.badge}
              </span>
              <h3 className="font-display text-[22px] font-bold leading-tight text-white">{promo.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{promo.subtitle}</p>
              <button
                className="mt-4 inline-block rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white/25"
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

      <section className="py-14">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-[1.5px] text-vp-primary">Explora</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-vp-text">Categorías</h2>
            </div>
            <button
              className="text-sm font-semibold text-vp-primary transition hover:opacity-75"
              onClick={() => navigate(ROUTES.catalog)}
            >
              Ver todo el catálogo →
            </button>
          </div>

          {loadingCats ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-[12px] bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="group relative overflow-hidden rounded-[12px] transition hover:-translate-y-1.5"
                  onClick={() => navigate(catalogQuery.byCategory(cat.id))}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[12px]">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-3.5 py-3 text-left">
                    <span className="text-sm font-bold text-white">{cat.name}</span>
                    <span className="text-[11px] text-white/75">{cat.productCount} productos</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F7F6F3] py-14">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-[1.5px] text-vp-primary">Selección</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-vp-text">Productos Destacados</h2>
            </div>
            <button
              className="text-sm font-semibold text-vp-primary transition hover:opacity-75"
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

      <section className="bg-vp-primary px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase tracking-wide text-white/75">⚡ OFERTA FLASH</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Hasta 40% OFF en prendas urbanas
            </h2>
            <p className="text-white/80">Oferta por tiempo limitado. ¡No te la pierdas!</p>
          </div>
          <button
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-vp-primary shadow-vp-md transition hover:-translate-y-0.5"
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
