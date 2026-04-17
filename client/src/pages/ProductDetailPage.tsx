import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { formatPrice, getDiscountPercentage, MOCK_PRODUCTS } from '../services/mockData';
import ProductGrid from '../components/catalog/ProductGrid';
import { ROUTES, catalogQuery } from '../routes/paths';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));

  const related = product
    ? MOCK_PRODUCTS.filter(
        (p) => p.categoryId === product.categoryId && p.id !== product.id
      ).slice(0, 4)
    : [];

  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-200" />
          <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-5 shadow-vp-sm">
            {[80, 50, 70, 40, 100, 60].map((w, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-gray-200" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-vp-sm">
          <span className="text-3xl">🔍</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-vp-text">Producto no encontrado</h2>
          <p className="mt-2 text-vp-text-muted">El producto que buscas no existe o fue removido.</p>
          <button
            className="mt-5 rounded-lg bg-vp-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-vp-primary/90"
            onClick={() => navigate(ROUTES.catalog)}
          >
            ← Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : null;
  const categoryId = product.category?.id ?? product.categoryId;

  return (
    <div className="bg-vp-bg pb-10">
      <nav className="border-y border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-3 text-sm text-vp-text-muted sm:px-6 lg:px-8">
          <Link to={ROUTES.home} className="transition hover:text-vp-primary">Inicio</Link>
          <span>/</span>
          <Link to={ROUTES.catalog} className="transition hover:text-vp-primary">Catálogo</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={catalogQuery.byCategory(product.category.id)} className="transition hover:text-vp-primary">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-medium text-vp-text">{product.name}</span>
        </div>
      </nav>

      <div className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-vp-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="aspect-[4/3] w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80';
                }}
              />
              {product.badge && (
                <span className="absolute left-3 top-3 rounded bg-vp-secondary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute right-3 top-3 rounded bg-vp-primary px-2.5 py-1 text-xs font-bold text-white">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-6 shadow-vp-sm">
            {product.category && (
              <button
                className="rounded-full bg-vp-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-vp-primary"
                onClick={() => navigate(catalogQuery.byCategory(categoryId))}
              >
                {product.category.name}
              </button>
            )}

            <h1 className="font-display text-3xl font-extrabold leading-tight text-vp-text">{product.name}</h1>

            {product.description && (
              <p className="text-vp-text-muted">{product.description}</p>
            )}

            <div className="space-y-2">
              <span className="text-3xl font-extrabold text-vp-text">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base text-vp-text-light line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Ahorras {formatPrice(product.comparePrice - product.price)}
                  </span>
                </div>
              )}
            </div>

            <div>
              {product.stock > 10 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  En stock ({product.stock} disponibles)
                </span>
              ) : product.stock > 0 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  ¡Solo quedan {product.stock} unidades!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm text-red-700">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Agotado
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-vp-secondary px-4 py-3 text-sm font-semibold text-white opacity-80"
                disabled
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Disponible en Sprint 3
              </button>
              <button
                className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-black/10 text-vp-text-muted transition hover:border-vp-primary hover:bg-vp-primary hover:text-white"
                aria-label="Agregar a favoritos"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 rounded-xl border border-black/10 bg-vp-bg p-4 text-sm text-vp-text-muted">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Envío rápido en 24h
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                Devoluciones gratis en 30 días
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Pago seguro garantizado
              </div>
            </div>

            <button
              className="text-sm font-semibold text-vp-primary underline-offset-2 transition hover:underline"
              onClick={() => navigate(ROUTES.catalog)}
            >
              ← Volver al catálogo
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-10 max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-vp-text">Productos relacionados</h2>
          <ProductGrid products={related} columns={4} variant="compact" />
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
