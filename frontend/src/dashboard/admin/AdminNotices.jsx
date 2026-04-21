import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminNotices() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    title: '',
    body: '',
    priority: 'normal',
    audience: 'all',
  });

  async function load() {
    setRows(await api('/api/admin/notices'));
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create(e) {
    e.preventDefault();
    await api('/api/admin/notices', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', body: '', priority: 'normal', audience: 'all' });
    load();
  }

  async function remove(id) {
    if (!confirm('Delete notice?')) return;
    await api(`/api/admin/notices/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notices</h1>
      <p className="text-sm text-slate-500">
        Saved in MongoDB and synced to Firestore for real-time student/teacher feeds when Firebase is configured.
      </p>
      <form
        onSubmit={create}
        className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <input
          placeholder="Title"
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Body"
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          rows={3}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <div className="flex flex-wrap gap-3">
          <select
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <select
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.audience}
            onChange={(e) => setForm({ ...form, audience: e.target.value })}
          >
            <option value="all">All</option>
            <option value="teachers">Teachers</option>
            <option value="students">Students</option>
          </select>
        </div>
        <button type="submit" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
          Publish notice
        </button>
      </form>
      <ul className="space-y-2">
        {rows.map((n) => (
          <li
            key={n._id}
            className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-slate-500">{n.body}</p>
              <p className="mt-1 text-xs text-slate-400">
                {n.audience} · {n.priority} · {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
            <button type="button" className="text-red-600" onClick={() => remove(n._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
