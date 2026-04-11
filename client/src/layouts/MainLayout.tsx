import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.css';

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
      navigate(`/catalogo?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/catalogo?categoryId=1', label: 'Electrónica' },
    { to: '/catalogo?categoryId=2', label: 'Moda' },
    { to: '/catalogo?categoryId=4', label: 'Deporte' },
  ];

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandIcon}>⚡</span>
            <span className={styles.brandText}>Vibe<strong>Pulse</strong></span>
          </Link>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`${styles.navLink} ${location.pathname === link.to ? styles.navLinkActive : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn} aria-label="Buscar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>

            <button className={styles.iconBtn} aria-label="Favoritos">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button className={styles.cartBtn} aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className={styles.cartBadge}>0</span>
            </button>

            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpen : ''}`} />
              <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpen : ''}`} />
              <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpen : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.brand}>
              <span className={styles.brandIcon}>⚡</span>
              <span className={styles.brandText}>Vibe<strong>Pulse</strong></span>
            </Link>
            <p className={styles.footerTagline}>
              Tu destino de compras con la mejor vibra.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div>
              <h4>Tienda</h4>
              <ul>
                <li><Link to="/catalogo">Catálogo</Link></li>
                <li><Link to="/catalogo?featured=true">Destacados</Link></li>
                <li><Link to="/catalogo?categoryId=1">Electrónica</Link></li>
                <li><Link to="/catalogo?categoryId=2">Moda</Link></li>
              </ul>
            </div>
            <div>
              <h4>Ayuda</h4>
              <ul>
                <li><a href="#">Preguntas frecuentes</a></li>
                <li><a href="#">Envíos y devoluciones</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 VibePulse. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
