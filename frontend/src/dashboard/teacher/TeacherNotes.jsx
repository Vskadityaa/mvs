import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import { apiForm } from '../../services/api.js';

export function TeacherNotes() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classId, setClassId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [title, setTitle] = useState('');
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
    if (!file) {
      alert('PDF / फाइल आवश्यक आहे');
      return;
    }
    const fd = new FormData();
    fd.append('title', title);
    fd.append('classRef', classId);
    if (subjectId) fd.append('subject', subjectId);
    fd.append('file', file);
    await apiForm('/api/teacher/notes', fd);
    setTitle('');
    setFile(null);
    alert('नोट Firebase Storage मध्ये अपलोड झाली');
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">अभ्यास नोट्स</h1>
      <p className="text-sm text-slate-500">कन्फिगरेशन असल्यास PDFs Firebase Storage मध्ये जतन होतात.</p>
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
        <input type="file" accept=".pdf,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white">
          PDF अपलोड करा
        </button>
      </form>
    </div>
  );
}
