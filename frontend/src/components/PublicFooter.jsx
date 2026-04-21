import { Link } from 'react-router-dom';
import { BRANDING } from '../config/branding.js';

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row md:justify-between md:px-6">
        <div>
          <p className="font-display text-base font-semibold leading-snug text-brand-700 dark:text-brand-300 md:text-lg">
            {BRANDING.schoolName}
          </p>
          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
            {BRANDING.schoolNameMicro} — portal for admins, teachers, students, and families. {BRANDING.locationLine}.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Explore</p>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/academics" className="hover:text-brand-600">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-brand-600">
                  Admission
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Account</p>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/login" className="hover:text-brand-600">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {BRANDING.schoolNameMicro}. All rights reserved.
      </p>
    </footer>
  );
}
