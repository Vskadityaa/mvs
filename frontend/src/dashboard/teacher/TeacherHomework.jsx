import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import { apiForm } from '../../services/api.js';

export function TeacherHomework() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classId, setClassId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    api('/api/teacher/profile/classes')
      .then((p) => {
        setClasses(p.classes || []);
        setSubjects(p.subjects || []);
        if (p.classes?.[0]) setClassId(p.classes[0]._id);
        if (p.subjects?.[0]) setSubjectId(p.subjects[0]._id);
      })
      .catch(() => {});
  }, []);

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('classRef', classId);
    fd.append('description', description);
    if (due) fd.append('dueDate', new Date(due).toISOString());
    if (subjectId) fd.append('subject', subjectId);
    if (file) fd.append('file', file);
    await apiForm('/api/teacher/homework', fd);
    setTitle('');
    setDescription('');
    setDue('');
    setFile(null);
    alert('गृहपाठ प्रकाशित झाला');
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">गृहपाठ</h1>
      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <select
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          {classes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} {c.section}
            </option>
          ))}
        </select>
        <select
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">विषय (ऐच्छिक)</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          placeholder="शीर्षक"
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="वर्णन"
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white">
          गृहपाठ अपलोड करा
        </button>
      </form>
    </div>
  );
}
