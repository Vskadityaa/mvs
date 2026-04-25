import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function TeacherMarks() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classId, setClassId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [students, setStudents] = useState([]);
  const [examName, setExamName] = useState('Unit Test 1');
  const [marks, setMarks] = useState({});

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

  useEffect(() => {
    if (!classId) return;
    api(`/api/teacher/classes/${classId}/students`)
      .then((list) => {
        setStudents(list);
        const m = {};
        list.forEach((s) => {
          m[s._id] = '';
        });
        setMarks(m);
      })
      .catch(() => {});
  }, [classId]);

  async function saveForStudent(studentId) {
    const obtained = Number(marks[studentId]);
    if (Number.isNaN(obtained)) {
      alert('वैध गुण भरा');
      return;
    }
    await api('/api/teacher/marks', {
      method: 'POST',
      body: JSON.stringify({
        student: studentId,
        subject: subjectId,
        classRef: classId,
        examName,
        obtained,
        maxMarks: 100,
      }),
    });
    alert('जतन झाले');
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">गुण नोंदणी</h1>
      <div className="flex flex-wrap gap-3">
        <select
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
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
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          placeholder="परीक्षेचे नाव"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">विद्यार्थी</th>
              <th className="px-4 py-3">गुण (/100)</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">{s.user?.name}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    className="w-24 rounded-lg border px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                    value={marks[s._id] ?? ''}
                    onChange={(e) => setMarks({ ...marks, [s._id]: e.target.value })}
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="text-sm font-semibold text-brand-600"
                    onClick={() => saveForStudent(s._id)}
                  >
                    जतन करा
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
