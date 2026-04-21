import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminEvents() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    featured: false,
  });

  async function load() {
    setRows(await api('/api/admin/events'));
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create(e) {
    e.preventDefault();
    await api('/api/admin/events', {
      method: 'POST',
      body: JSON.stringify({ ...form, date: form.date ? new Date(form.date) : new Date() }),
    });
    setForm({ title: '', description: '', date: '', venue: '', featured: false });
    load();
  }

  async function remove(id) {
    if (!confirm('Delete event?')) return;
    await api(`/api/admin/events/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Events</h1>
      <form
        onSubmit={create}
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2"
      >
        <input
          placeholder="Title"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Venue"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured
        </label>
        <textarea
          placeholder="Description"
          className="md:col-span-2 rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="md:col-span-2 rounded-xl bg-brand-600 py-2 text-sm font-semibold text-white"
        >
          Add event
        </button>
      </form>
      <ul className="space-y-2">
        {rows.map((ev) => (
          <li
            key={ev._id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <p className="font-medium">{ev.title}</p>
              <p className="text-xs text-slate-500">
                {ev.date ? new Date(ev.date).toLocaleString() : ''} {ev.venue ? `· ${ev.venue}` : ''}
              </p>
            </div>
            <button type="button" className="text-red-600" onClick={() => remove(ev._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
