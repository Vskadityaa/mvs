import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';

export function Faculty() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/api/public/faculty')
      .then(setTeachers)
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">शिक्षकवर्ग</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        विद्यार्थ्यांच्या प्रगतीसाठी कटिबद्ध अनुभवी शिक्षक — उपलब्ध असल्यास लाईव्ह डायरेक्टरीमधून येथे दर्शवले जातात.
      </p>
      {loading ? (
        <p className="mt-10 text-slate-500">लोड होत आहे…</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-40 bg-gradient-to-br from-brand-100 to-indigo-100 dark:from-brand-900/40 dark:to-slate-800">
                {t.photoUrl ? (
                  <img src={t.photoUrl} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-slate-900 dark:text-white">{t.user?.name}</h2>
                <p className="mt-1 text-sm text-brand-700 dark:text-brand-300">
                  {t.qualification || 'शिक्षक'} · {t.experienceYears ?? 0} वर्षांचा अनुभव
                </p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{t.bio}</p>
                <p className="mt-3 text-xs text-slate-500">
                  {(t.subjects || []).map((s) => s.name).filter(Boolean).join(', ') || 'विषय लवकरच'}
                </p>
              </div>
            </motion.div>
          ))}
          {teachers.length === 0 && (
            <p className="text-slate-500">अजून सार्वजनिक शिक्षक नोंदी नाहीत. प्रशासक प्रोफाइल प्रकाशित करू शकतात.</p>
          )}
        </div>
      )}
    </div>
  );
}
