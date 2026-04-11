import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Lazy load de páginas para mejor performance
const HomePage = lazy(() => import('../pages/HomePage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));

const PageLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 68px)',
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: '3px solid #F3F4F6',
        borderTopColor: '#FF4757',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Ruta raíz → Inicio */}
          <Route path="/" element={<HomePage />} />

          {/* Catálogo general + filtros por URL */}
          <Route path="/catalogo" element={<CatalogPage />} />

          {/* Detalle de producto */}
          <Route path="/producto/:id" element={<ProductDetailPage />} />

          {/* Redirige rutas desconocidas al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default AppRouter;
