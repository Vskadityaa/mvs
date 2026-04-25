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
            {BRANDING.schoolNameMicro} — प्रशासक, शिक्षक, विद्यार्थी आणि पालकांसाठी पोर्टल. {BRANDING.locationLine}.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">एक्सप्लोर</p>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/academics" className="hover:text-brand-600">
                  शैक्षणिक
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-brand-600">
                  प्रवेश
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">खाते</p>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/login" className="hover:text-brand-600">
                  लॉगिन
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {BRANDING.schoolNameMicro}. सर्व हक्क राखीव.
      </p>
    </footer>
  );
}
