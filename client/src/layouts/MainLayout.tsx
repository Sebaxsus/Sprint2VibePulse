import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, catalogQuery } from '../routes/paths';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(catalogQuery.search(searchQuery.trim()));
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: ROUTES.home, label: 'Inicio' },
    { to: ROUTES.catalog, label: 'Catálogo' },
  ];

  const isNavLinkActive = (to: string) => {
    if (to === ROUTES.home) {
      return location.pathname === ROUTES.home;
    }
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-vp-bg text-vp-text">
      <header
        className={`sticky top-0 z-50 border-b transition ${
          scrolled
            ? 'border-black/10 bg-white/95 shadow-vp-sm backdrop-blur'
            : 'border-transparent bg-white/70 backdrop-blur'
        }`}
      >
        <nav className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link to={ROUTES.home} className="inline-flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-vp-primary text-sm text-white">⚡</span>
            <span className="font-display text-xl font-bold tracking-tight text-vp-text">
              Vibe<strong>Pulse</strong>
            </span>
          </Link>

          <ul
            className={`absolute left-0 right-0 top-[68px] border-b border-black/10 bg-white px-4 pb-4 pt-2 shadow-vp-md lg:static lg:flex lg:items-center lg:gap-2 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none ${
              menuOpen ? 'block' : 'hidden lg:flex'
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`inline-flex w-full rounded-md px-3 py-2 text-sm font-medium transition lg:w-auto ${
                    isNavLinkActive(link.to)
                      ? 'bg-vp-primary/10 text-vp-primary'
                      : 'text-vp-text-muted hover:bg-gray-100 hover:text-vp-text'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1.5 shadow-vp-sm md:flex">
              <input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 bg-transparent px-2 text-sm text-vp-text placeholder:text-vp-text-light focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full p-1.5 text-vp-text-muted transition hover:bg-gray-100 hover:text-vp-text"
                aria-label="Buscar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>

            <button className="hidden rounded-full p-2 text-vp-text-muted transition hover:bg-gray-100 hover:text-vp-text sm:inline-flex" aria-label="Favoritos">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button className="relative hidden rounded-full p-2 text-vp-text-muted transition hover:bg-gray-100 hover:text-vp-text sm:inline-flex" aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-vp-primary px-1 text-[10px] font-bold text-white">0</span>
            </button>

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-vp-text-muted transition hover:bg-gray-100 hover:text-vp-text lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          <div>
            <Link to={ROUTES.home} className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-vp-primary text-sm text-white">⚡</span>
              <span className="font-display text-xl font-bold tracking-tight text-vp-text">Vibe<strong>Pulse</strong></span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-vp-text-muted">
              Tu destino de compras con la mejor vibra.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-vp-text">Tienda</h4>
              <ul className="space-y-1.5 text-sm text-vp-text-muted">
                <li><Link to={ROUTES.catalog} className="transition hover:text-vp-primary">Catálogo</Link></li>
                <li><Link to={catalogQuery.featured} className="transition hover:text-vp-primary">Destacados</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-vp-text">Ayuda</h4>
              <ul className="space-y-1.5 text-sm text-vp-text-muted">
                <li><a href="mailto:soporte@vibepulse.com" className="transition hover:text-vp-primary">Preguntas frecuentes</a></li>
                <li><a href="mailto:soporte@vibepulse.com" className="transition hover:text-vp-primary">Envíos y devoluciones</a></li>
                <li><a href="mailto:soporte@vibepulse.com" className="transition hover:text-vp-primary">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-black/10 py-4 text-center text-xs text-vp-text-light">
          © 2025 VibePulse. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
