import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminSuggestions() {
  const [rows, setRows] = useState([]);

  async function load() {
    setRows(await api('/api/admin/suggestions'));
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function mark(id, status) {
    await api(`/api/admin/suggestions/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Suggestions & contact</h1>
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-slate-500">{r.email}</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{r.message}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">{r.status}</span>
                {r.status === 'new' && (
                  <button
                    type="button"
                    className="text-xs font-semibold text-brand-600"
                    onClick={() => mark(r._id, 'reviewed')}
                  >
                    Mark reviewed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
