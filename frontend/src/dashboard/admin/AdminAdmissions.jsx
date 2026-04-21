import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminAdmissions() {
  const [rows, setRows] = useState([]);

  async function load() {
    setRows(await api('/api/admin/admissions'));
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function setStatus(id, status) {
    await api(`/api/admin/admissions/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Admissions</h1>
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{r.studentName}</p>
                <p className="text-sm text-slate-500">
                  Parent: {r.parentName} · {r.email} · {r.phone}
                </p>
                <p className="mt-1 text-sm">Class: {r.applyingClass}</p>
                {r.message && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{r.message}</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    r.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : r.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {r.status}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                    onClick={() => setStatus(r._id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                    onClick={() => setStatus(r._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-slate-500">No applications yet.</p>}
      </div>
    </div>
  );
}
