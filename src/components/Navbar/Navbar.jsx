import { Close, Menu } from '@mui/icons-material';
import Logo from '../../assets/logo.png';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const NAV_LINKS = [
  { to: '/',      label: 'Home'  },
  { to: '/tips',  label: 'Tips'  },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close     = ()  => setOpen(false);
  const toggle    = ()  => setOpen(prev => !prev);
  const handleLogout = () => { signOut(auth); close(); };

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} ref={menuRef}>
        {/* Brand */}
        <NavLink to="/" className="navbar__brand" onClick={close} aria-label="Flash VIP Tips home">
          <img src={Logo} alt="Flash VIP Tips logo" />
          <span className="navbar__site-name">Flash VIP Tips</span>
        </NavLink>

        {/* Desktop nav links */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="navbar__auth">
          {currentUser ? (
            <button className="btn navbar__btn--ghost" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login"    className="btn navbar__btn--ghost">Login</NavLink>
              <NavLink to="/register" className="btn">Register</NavLink>
            </>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={`navbar__hamburger${open ? ' navbar__hamburger--open' : ''}`}
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="navbar__drawer-links" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
              }
              end={to === '/'}
              onClick={close}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__drawer-auth">
          {currentUser ? (
            <button className="btn" onClick={handleLogout} style={{ width: '100%' }}>
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/register" className="btn" onClick={close} style={{ width: '100%', textAlign: 'center' }}>
                Register
              </NavLink>
              <NavLink to="/login" className="btn navbar__btn--ghost" onClick={close} style={{ width: '100%', textAlign: 'center' }}>
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div className="navbar__backdrop" onClick={close} aria-hidden="true" />
      )}
    </>
  );
}
