import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { getDemoProfile } from '../demo/demoProfiles.js';
import { getDemoToken } from '../demo/staticDemoApi.js';

const AuthContext = createContext(null);

function loadStaticDemoSession() {
  try {
    const raw = localStorage.getItem('staticDemoUser');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }
    if (token === getDemoToken()) {
      const session = loadStaticDemoSession() || getDemoProfile('student');
      setUser(session.user);
      setProfile(session.profile ?? null);
      setLoading(false);
      return;
    }
    try {
      localStorage.removeItem('staticDemoUser');
      const data = await api('/api/auth/me');
      setUser(data.user);
      setProfile(data.profile);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('staticDemoUser');
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshMe();
  }, []);

  function loginPayload(payload) {
    localStorage.removeItem('staticDemoUser');
    localStorage.setItem('token', payload.token);
    setUser(payload.user);
    refreshMe();
  }

  function loginStaticDemo(role) {
    const { user: u, profile: p } = getDemoProfile(role);
    localStorage.setItem('token', getDemoToken());
    localStorage.setItem('staticDemoUser', JSON.stringify({ user: u, profile: p }));
    setUser(u);
    setProfile(p ?? null);
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('staticDemoUser');
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, loginPayload, loginStaticDemo, logout, refreshMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
