import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminStudents() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: 'Student@123',
    rollNo: '',
    admissionNo: '',
  });
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState('');

  async function load() {
    const [s, c] = await Promise.all([
      api(`/api/admin/students?q=${encodeURIComponent(q)}`),
      api('/api/admin/classes'),
    ]);
    setRows(s);
    setClasses(c);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create(e) {
    e.preventDefault();
    await api('/api/admin/students', {
      method: 'POST',
      body: JSON.stringify({ ...form, class: classId || undefined }),
    });
    setForm({ name: '', email: '', password: 'Student@123', rollNo: '', admissionNo: '' });
    load();
  }

  async function remove(id) {
    if (!confirm('Delete student?')) return;
    await api(`/api/admin/students/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Students</h1>
          <p className="text-sm text-slate-500">Search, add, and remove student accounts</p>
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Search roll / admission"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            type="button"
            onClick={() => load()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
          >
            Search
          </button>
        </div>
      </div>

      <form
        onSubmit={create}
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3 lg:grid-cols-6"
      >
        <input
          placeholder="Name"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="Roll no"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
        />
        <input
          placeholder="Admission no"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={form.admissionNo}
          onChange={(e) => setForm({ ...form, admissionNo: e.target.value })}
        />
        <select
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          <option value="">Class (optional)</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} {c.section}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-brand-600 py-2 text-sm font-semibold text-white md:col-span-3 lg:col-span-6"
        >
          Add student
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Roll</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{r.user?.name}</td>
                <td className="px-4 py-3 text-slate-500">{r.user?.email}</td>
                <td className="px-4 py-3">
                  {r.class ? `${r.class.name} ${r.class.section}` : '—'}
                </td>
                <td className="px-4 py-3">{r.rollNo || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-red-600" onClick={() => remove(r._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
