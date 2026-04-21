import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { BRANDING } from '../config/branding.js';
import { BrandMark } from './BrandMark.jsx';
import { MobileDrawer, KebabMenuButton } from './MobileDrawer.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/admission', label: 'Admission' },
  { to: '/suggestion', label: 'Suggestion' },
  { to: '/contact', label: 'Contact' },
];

export function PublicNavbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={closeMenu}>
          <BrandMark className="h-8 shrink-0 md:h-9" />
          <span className="hidden max-w-[200px] truncate font-display text-sm font-semibold leading-tight text-slate-800 dark:text-slate-100 sm:inline md:max-w-none md:text-base">
            {BRANDING.schoolNameShort}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={toggle}
            className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {dark ? 'Light' : 'Dark'}
          </motion.button>
          {user ? (
            <>
              <Link
                to={
                  user.role === 'admin' ? '/admin' : user.role === 'teacher' ? '/teacher' : '/student'
                }
                onClick={closeMenu}
                className="rounded-lg bg-brand-600 px-2.5 py-2 text-xs font-semibold text-white shadow-card hover:bg-brand-700 sm:px-3 sm:text-sm"
              >
                <span className="sm:hidden">Hub</span>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="hidden text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 sm:inline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-lg bg-brand-600 px-2.5 py-2 text-xs font-semibold text-white shadow-card hover:bg-brand-700 sm:px-3 sm:text-sm"
            >
              Login
            </Link>
          )}

          <KebabMenuButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>
      </div>

      <MobileDrawer open={menuOpen} onClose={closeMenu} title="Pages">
        <p className="mb-2 px-4 text-xs text-slate-500 dark:text-slate-400">
          Home, About, Academics, and more
        </p>
        <nav className="flex flex-col px-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md dark:bg-brand-500'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-4 border-t border-slate-200 px-4 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              toggle();
            }}
            className="mb-3 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium dark:border-slate-700"
          >
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
          {user ? (
            <>
              <Link
                to={user.role === 'admin' ? '/admin' : user.role === 'teacher' ? '/teacher' : '/student'}
                onClick={closeMenu}
                className="mb-2 block w-full rounded-xl bg-brand-600 py-2.5 text-center text-sm font-semibold text-white"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="w-full rounded-xl py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-sm font-semibold text-white"
            >
              Login
            </Link>
          )}
        </div>
      </MobileDrawer>
    </header>
  );
}
