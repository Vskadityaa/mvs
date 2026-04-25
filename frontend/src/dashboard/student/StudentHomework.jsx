import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function StudentHomework() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api('/api/student/homework').then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">गृहपाठ</h1>
      <ul className="space-y-3">
        {rows.map((h) => (
          <li
            key={h._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="font-semibold">{h.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{h.description}</p>
            <p className="mt-2 text-xs text-slate-500">
              अंतिम तारीख: {h.dueDate ? new Date(h.dueDate).toLocaleString() : '—'} · विषय:{' '}
              {h.subject?.name || '—'}
            </p>
            {h.attachmentUrl && (
              <a
                href={h.attachmentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-brand-600"
              >
                जोडफाइल डाउनलोड
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
