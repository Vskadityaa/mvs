import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

export function StudentFees() {
  const [amount, setAmount] = useState(5000);
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState('');

  async function refresh() {
    setHistory(await api('/api/payment/mine'));
  }

  useEffect(() => {
    refresh().catch(() => {});
  }, []);

  async function pay() {
    setMsg('');
    try {
      const orderPayload = await api('/api/payment/order', {
        method: 'POST',
        body: JSON.stringify({ amount, purpose: 'शिक्षण फी' }),
      });

      if (orderPayload.mode === 'dummy') {
        setMsg(orderPayload.message || 'डेमो पेमेंट नोंदवले गेले.');
        refresh();
        return;
      }

      await loadRazorpayScript();
      const options = {
        key: orderPayload.key,
        amount: orderPayload.order.amount,
        currency: orderPayload.order.currency,
        name: "NVM's Maharashtra English School",
        description: 'फी पेमेंट',
        order_id: orderPayload.order.id,
        handler: async function (response) {
          try {
            await api('/api/payment/verify', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: orderPayload.paymentId,
              }),
            });
            setMsg('पेमेंट यशस्वीपणे पडताळले गेले.');
            refresh();
          } catch (e) {
            setMsg(e.message);
          }
        },
        theme: { color: '#3188ff' },
      };
      const rz = new window.Razorpay(options);
      rz.open();
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">फी</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <label className="text-sm font-medium">रक्कम (INR)</label>
        <input
          type="number"
          className="mt-1 w-full max-w-xs rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          type="button"
          onClick={pay}
          className="mt-4 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white"
        >
          आत्ता भरा
        </button>
        {msg && <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{msg}</p>}
        <p className="mt-4 text-xs text-slate-500">
          सर्व्हरवर Razorpay keys नसल्यास डेमो पेमेंट आपोआप नोंदवले जाते.
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-slate-900 dark:text-white">इतिहास</h2>
        <ul className="mt-3 space-y-2">
          {history.map((p) => (
            <li
              key={p._id}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              ₹{p.amount} · <span className="capitalize">{p.status}</span> ·{' '}
              {p.paidAt ? new Date(p.paidAt).toLocaleString() : 'प्रलंबित'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
