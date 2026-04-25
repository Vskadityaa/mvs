import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { getFirebaseAuth, googleProvider, isFirebaseConfigured } from '../services/firebaseClient.js';
import { BRANDING } from '../config/branding.js';
import { BrandMark } from '../components/BrandMark.jsx';

export function Login() {
  const { loginPayload, loginStaticDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function redirectByRole(r) {
    if (r === 'admin') navigate('/admin', { replace: true });
    else if (r === 'teacher') navigate('/teacher', { replace: true });
    else navigate('/student', { replace: true });
  }

  function enterDemo(r) {
    setError('');
    loginStaticDemo(r);
    redirectByRole(r);
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const data = await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        loginPayload(data);
        redirectByRole(data.user.role);
      } else {
        const data = await api('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, role }),
        });
        loginPayload(data);
        redirectByRole(data.user.role);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    const auth = getFirebaseAuth();
    if (!auth) {
      setError('या बिल्डमध्ये Firebase कॉन्फिगर नाही.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const idToken = await cred.user.getIdToken();
      const data = await api('/api/auth/firebase', {
        method: 'POST',
        body: JSON.stringify({ idToken, role }),
      });
      loginPayload(data);
      redirectByRole(data.user.role);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-center">
        {/* Static demo — no backend required */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex-1 rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-card dark:border-brand-800 dark:from-brand-950/50 dark:to-slate-900 lg:max-w-md"
        >
          <div className="flex items-center gap-3">
            <BrandMark className="h-10" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                डेमो मोड
              </p>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                सर्व्हर शिवाय पाहणी
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            <strong>static demo</strong> वापरून प्रशासक, शिक्षक आणि विद्यार्थी डॅशबोर्ड नमुना डेटासह
            पाहू शकता. MongoDB किंवा API शिवायही हे चालते — सादरीकरण आणि डिझाइन पुनरावलोकनासाठी उपयुक्त.
          </p>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => enterDemo('admin')}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              प्रशासक म्हणून प्रवेश
            </button>
            <button
              type="button"
              onClick={() => enterDemo('teacher')}
              className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              शिक्षक म्हणून प्रवेश
            </button>
            <button
              type="button"
              onClick={() => enterDemo('student')}
              className="w-full rounded-xl border-2 border-brand-200 bg-white py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50 dark:border-brand-700 dark:bg-slate-900 dark:text-brand-100 dark:hover:bg-slate-800"
            >
              विद्यार्थी म्हणून प्रवेश
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            नंतर खरा API जोडायचा असल्यास लॉगआउट करून उजवीकडील फॉर्म वापरा — किंवा या repo मधील backend
            deploy करून हाच UI वापरत राहा.
          </p>
        </motion.div>

        {/* Live API login */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="w-full flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 lg:max-w-md"
        >
          <div className="flex items-center justify-between gap-2">
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? 'लाईव्ह API लॉगिन' : 'नवीन खाते'}
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500 dark:bg-slate-800">
              {BRANDING.schoolNameMicro}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            backend + MongoDB आवश्यक. JWT सेशन्स
            {isFirebaseConfigured() ? ' · Google पर्यायी' : ''}.
          </p>

          <div className="mt-6 flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
                mode === 'login' ? 'bg-white shadow dark:bg-slate-950' : 'text-slate-500'
              }`}
              onClick={() => setMode('login')}
            >
              लॉगिन
            </button>
            <button
              type="button"
              className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
                mode === 'signup' ? 'bg-white shadow dark:bg-slate-950' : 'text-slate-500'
              }`}
              onClick={() => setMode('signup')}
            >
              नोंदणी
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-sm font-medium">पूर्ण नाव</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={mode === 'signup'}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium">भूमिका</label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">विद्यार्थी</option>
                <option value="teacher">शिक्षक</option>
                <option value="admin">प्रशासक</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">ईमेल</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">पासवर्ड</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'कृपया थांबा…' : mode === 'login' ? 'लॉगिन' : 'नोंदणी'}
            </button>
          </form>

          {isFirebaseConfigured() && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs text-slate-500">किंवा</span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>
              <button
                type="button"
                onClick={google}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
              >
                Google ने पुढे जा
              </button>
            </>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            <Link to="/" className="text-brand-600 hover:underline">
              ← संकेतस्थळावर परत जा
            </Link>
            {from !== '/' && <span className="mt-1 block text-xs text-slate-400">विनंती: {from}</span>}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
