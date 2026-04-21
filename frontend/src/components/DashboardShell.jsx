import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { MobileDrawer, HamburgerButton } from './MobileDrawer.jsx';

function navClass({ isActive }) {
  return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;
}

export function DashboardShell({ navItems, title, children }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-white">{title}</p>
            <p className="mt-1 truncate text-xs text-slate-500">{user?.email}</p>
            <nav className="mt-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                ← Public site
              </button>
              <button
                type="button"
                onClick={toggle}
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {dark ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <p className="min-w-0 truncate font-display font-semibold text-slate-900 dark:text-white">
              {title}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={toggle}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs dark:border-slate-700"
              >
                {dark ? 'Light' : 'Dark'}
              </motion.button>
              <HamburgerButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            </div>
          </div>

          <MobileDrawer open={menuOpen} onClose={closeMenu} title={`${title} menu`}>
            <p className="mb-2 px-4 text-xs text-slate-500">{user?.email}</p>
            <nav className="flex flex-col px-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/50 dark:text-brand-100'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 border-t border-slate-200 px-4 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mb-2 w-full rounded-xl py-2.5 text-left text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                ← Public site
              </button>
              <button
                type="button"
                onClick={toggle}
                className="mb-2 w-full rounded-xl py-2.5 text-left text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {dark ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="w-full rounded-xl py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                Logout
              </button>
            </div>
          </MobileDrawer>

          {children}
        </div>
      </div>
    </div>
  );
}
