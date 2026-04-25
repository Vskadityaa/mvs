import { useState } from 'react';
import { api } from '../../services/api.js';

export function StudentChat() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  async function send(e) {
    e.preventDefault();
    setStatus('');
    try {
      await api('/api/student/chat', { method: 'POST', body: JSON.stringify({ text }) });
      setText('');
      setStatus('संदेश पाठवला (Firestore वर्ग चॅनेल).');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">वर्ग संदेश</h1>
      <p className="text-sm text-slate-500">
        तुमच्या वर्गासाठी Firestore मध्ये संदेश जतन होतो. गरजेनुसार रिअल-टाइम श्रोते जोडा.
      </p>
      <form onSubmit={send} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <textarea
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          required
        />
        <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white">
          पाठवा
        </button>
        {status && <p className="text-sm text-slate-600 dark:text-slate-400">{status}</p>}
      </form>
    </div>
  );
}
