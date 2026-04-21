import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminTeachers() {
  const [rows, setRows] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: 'Teacher@123',
    qualification: '',
    experienceYears: 1,
    bio: '',
  });
  const [classIds, setClassIds] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);

  async function load() {
    const [t, c, s] = await Promise.all([
      api('/api/admin/teachers'),
      api('/api/admin/classes'),
      api('/api/admin/subjects'),
    ]);
    setRows(t);
    setClasses(c);
    setSubjects(s);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  function toggle(arr, id, setFn) {
    if (arr.includes(id)) setFn(arr.filter((x) => x !== id));
    else setFn([...arr, id]);
  }

  async function create(e) {
    e.preventDefault();
    await api('/api/admin/teachers', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        experienceYears: Number(form.experienceYears),
        classes: classIds,
        subjects: subjectIds,
      }),
    });
    setForm({
      name: '',
      email: '',
      password: 'Teacher@123',
      qualification: '',
      experienceYears: 1,
      bio: '',
    });
    setClassIds([]);
    setSubjectIds([]);
    load();
  }

  async function remove(id) {
    if (!confirm('Delete teacher?')) return;
    await api(`/api/admin/teachers/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Teachers</h1>
        <p className="text-sm text-slate-500">Assign classes and subjects</p>
      </div>

      <form
        onSubmit={create}
        className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <input
            placeholder="Name"
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            placeholder="Qualification"
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
          />
          <input
            type="number"
            placeholder="Experience years"
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.experienceYears}
            onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
          />
          <input
            placeholder="Bio"
            className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 md:col-span-3"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Classes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {classes.map((c) => (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => toggle(classIds, c._id, setClassIds)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    classIds.includes(c._id)
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {c.name} {c.section}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Subjects</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button
                  key={s._id}
                  type="button"
                  onClick={() => toggle(subjectIds, s._id, setSubjectIds)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    subjectIds.includes(s._id)
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="rounded-xl bg-brand-600 px-6 py-2 text-sm font-semibold text-white">
          Add teacher
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Qualification</th>
              <th className="px-4 py-3">Classes</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{r.user?.name}</td>
                <td className="px-4 py-3">{r.qualification}</td>
                <td className="px-4 py-3">
                  {(r.classes || []).map((c) => `${c.name} ${c.section}`).join(', ') || '—'}
                </td>
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
