import { useState } from 'react';
import { api } from '../../services/api.js';

export function StudentFeedback() {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('general');
  const [status, setStatus] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await api('/api/student/feedback', { method: 'POST', body: JSON.stringify({ message, category }) });
      setStatus('धन्यवाद — अभिप्राय पाठवला गेला.');
      setMessage('');
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">अभिप्राय</h1>
      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <select
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">सामान्य</option>
          <option value="academic">शैक्षणिक</option>
          <option value="infra">पायाभूत सुविधा</option>
        </select>
        <textarea
          className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={5}
        />
        <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white">
          पाठवा
        </button>
        {status && <p className="text-center text-sm text-slate-600 dark:text-slate-400">{status}</p>}
      </form>
    </div>
  );
}
