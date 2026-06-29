import { Close, Menu } from '@mui/icons-material';
import Logo from '/logo192.png';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/tips', label: 'Tips' },
  { path: '/about', label: 'About' }
];

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleClick = (e) => {
      if (open && headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header ref={headerRef} className={scrolled ? 'scrolled' : ''}>
      <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
        <img src={Logo} alt="Flash VIP Tips" />
      </NavLink>

      <nav className={open ? '' : 'closed'}>
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            title={link.label.toLowerCase()}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={`btn-wrapper ${open ? '' : 'closed'}`}>
        {currentUser ? (
          <span className="btn" onClick={handleLogout}>Logout</span>
        ) : (
          <>
            <NavLink to="/register" className="btn" title="register" onClick={() => setOpen(false)}>Register</NavLink>
            <NavLink to="/login" className="btn" title="login" onClick={() => setOpen(false)}>Login</NavLink>
          </>
        )}
      </div>

      <div className="navbar__backdrop" style={{ display: open ? 'block' : 'none' }} onClick={() => setOpen(false)} />

      <div className="close" onClick={() => setOpen(!open)}>
        {open ? <Close /> : <Menu />}
      </div>
    </header>
  );
}
