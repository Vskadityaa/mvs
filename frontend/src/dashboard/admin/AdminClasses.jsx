import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [cform, setCform] = useState({ name: '', section: '', academicYear: '2025-26' });
  const [sform, setSform] = useState({ name: '', code: '' });
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  async function load() {
    const [c, s] = await Promise.all([api('/api/admin/classes'), api('/api/admin/subjects')]);
    setClasses(c);
    setSubjects(s);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function addClass(e) {
    e.preventDefault();
    await api('/api/admin/classes', {
      method: 'POST',
      body: JSON.stringify({ ...cform, subjects: selectedSubjects }),
    });
    setCform({ name: '', section: '', academicYear: '2025-26' });
    setSelectedSubjects([]);
    load();
  }

  async function addSubject(e) {
    e.preventDefault();
    await api('/api/admin/subjects', { method: 'POST', body: JSON.stringify(sform) });
    setSform({ name: '', code: '' });
    load();
  }

  async function removeClass(id) {
    if (!confirm('Delete class?')) return;
    await api(`/api/admin/classes/${id}`, { method: 'DELETE' });
    load();
  }

  async function removeSubject(id) {
    if (!confirm('Delete subject?')) return;
    await api(`/api/admin/subjects/${id}`, { method: 'DELETE' });
    load();
  }

  function toggleSub(id) {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Classes</h1>
        <form onSubmit={addClass} className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-2 md:grid-cols-3">
            <input
              placeholder="Name e.g. Std 5"
              className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              value={cform.name}
              onChange={(e) => setCform({ ...cform, name: e.target.value })}
              required
            />
            <input
              placeholder="Section e.g. A"
              className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              value={cform.section}
              onChange={(e) => setCform({ ...cform, section: e.target.value })}
            />
            <input
              placeholder="Year"
              className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              value={cform.academicYear}
              onChange={(e) => setCform({ ...cform, academicYear: e.target.value })}
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Subjects in this class</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button
                  key={s._id}
                  type="button"
                  onClick={() => toggleSub(s._id)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    selectedSubjects.includes(s._id)
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            Add class
          </button>
        </form>
        <ul className="mt-4 space-y-2">
          {classes.map((c) => (
            <li
              key={c._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span>
                <strong>{c.name}</strong> {c.section} · {(c.subjects || []).map((s) => s.name).join(', ')}
              </span>
              <button type="button" className="text-red-600" onClick={() => removeClass(c._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">Subjects</h2>
        <form onSubmit={addSubject} className="mt-4 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <input
            placeholder="Subject name"
            className="flex-1 rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={sform.name}
            onChange={(e) => setSform({ ...sform, name: e.target.value })}
            required
          />
          <input
            placeholder="Code"
            className="w-28 rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={sform.code}
            onChange={(e) => setSform({ ...sform, code: e.target.value })}
          />
          <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
            Add
          </button>
        </form>
        <ul className="mt-4 space-y-2">
          {subjects.map((s) => (
            <li
              key={s._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span>
                {s.name} <span className="text-slate-400">{s.code}</span>
              </span>
              <button type="button" className="text-red-600" onClick={() => removeSubject(s._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
