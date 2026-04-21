import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore';
import { api } from '../../services/api.js';
import { getDb, isFirebaseConfigured } from '../../services/firebaseClient.js';

export function StudentNotices() {
  const [mongo, setMongo] = useState([]);
  const [live, setLive] = useState([]);
  const [fsOn, setFsOn] = useState(false);

  useEffect(() => {
    api('/api/student/notices').then(setMongo).catch(() => setMongo([]));
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured()) return undefined;
    const db = getDb();
    if (!db) return undefined;
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(30));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setFsOn(true);
        setLive(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      () => {
        setFsOn(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notices</h1>
      {fsOn && (
        <div>
          <p className="mb-2 text-sm font-semibold text-emerald-600">Live (Firestore)</p>
          <ul className="space-y-3">
            {live.map((n) => (
              <li
                key={n.id}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30"
              >
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-500">Archive (MongoDB API)</p>
        <ul className="space-y-3">
          {mongo.map((n) => (
            <li
              key={n._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{n.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
