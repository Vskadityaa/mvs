import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api.js';

export function TeacherAttendance() {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [statusMap, setStatusMap] = useState({});

  async function loadStudents() {
    const list = await api(`/api/teacher/classes/${classId}/students`);
    setStudents(list);
    const init = {};
    list.forEach((s) => {
      init[s._id] = 'present';
    });
    setStatusMap(init);
  }

  useEffect(() => {
    if (classId) loadStudents().catch(() => {});
  }, [classId]);

  useEffect(() => {
    if (!classId) return;
    api(`/api/teacher/classes/${classId}/attendance?date=${date}`)
      .then((rows) => {
        const next = { ...statusMap };
        rows.forEach((r) => {
          next[r.student._id] = r.status;
        });
        setStatusMap(next);
      })
      .catch(() => {});
  }, [classId, date]);

  async function save() {
    const entries = Object.entries(statusMap).map(([student, status]) => ({ student, status }));
    await api('/api/teacher/attendance', {
      method: 'POST',
      body: JSON.stringify({ classRef: classId, date, entries }),
    });
    alert('Attendance saved');
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Attendance</h1>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          type="button"
          onClick={save}
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">{s.user?.name}</td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-lg border px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                    value={statusMap[s._id] || 'present'}
                    onChange={(e) => setStatusMap({ ...statusMap, [s._id]: e.target.value })}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
