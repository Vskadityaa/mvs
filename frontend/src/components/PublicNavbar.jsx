import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { BRANDING } from '../config/branding.js';
import { BrandMark } from './BrandMark.jsx';

const primaryLinks = [
  { to: '/', label: 'मुख्यपृष्ठ' },
  { to: '/admission', label: 'प्रवेश' },
  { to: '/teacher', label: 'शिक्षक कट्टा ' },
  { to: '/student', label: 'विद्यार्थी कट्टा ' },
  { to: '/student-life', label: 'माजी विद्यार्थी कट्टा ' },
];

const moreLinks = [
  { to: '/about', label: 'आमच्याबद्दल' },
  { to: '/academics', label: 'शैक्षणिक' },
  { to: '/faculty', label: 'शिक्षकवर्ग' },
  { to: '/suggestion', label: 'सूचना' },
  { to: '/contact', label: 'संपर्क' },
];

export function PublicNavbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <BrandMark className="h-8 shrink-0 md:h-9" />
          <span className="hidden max-w-[200px] truncate font-display text-sm font-semibold leading-tight text-slate-800 dark:text-slate-100 sm:inline md:max-w-none md:text-base">
            {BRANDING.schoolNameShort}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <details className="group relative">
            <summary className="list-none cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              अधिक
            </summary>
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              {moreLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm ${
                      isActive
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </details>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={toggle}
            className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="डार्क मोड बदला"
          >
            {dark ? 'लाईट' : 'डार्क'}
          </motion.button>
          {user ? (
            <>
              <Link
                to={
                  user.role === 'admin' ? '/admin' : user.role === 'teacher' ? '/teacher' : '/student'
                }
                className="rounded-lg bg-brand-600 px-2.5 py-2 text-xs font-semibold text-white shadow-card hover:bg-brand-700 sm:px-3 sm:text-sm"
              >
                <span className="sm:hidden">पॅनल</span>
                <span className="hidden sm:inline">डॅशबोर्ड</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                }}
                className="hidden text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 sm:inline"
              >
                बाहेर पडा
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-brand-600 px-2.5 py-2 text-xs font-semibold text-white shadow-card hover:bg-brand-700 sm:px-3 sm:text-sm"
            >
              लॉगिन
            </Link>
          )}
        </div>
      </div>
      <div className="border-t border-slate-200/70 px-4 py-2 lg:hidden dark:border-slate-800/70">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {[...primaryLinks, ...moreLinks].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
