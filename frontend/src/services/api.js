import { isStaticDemoToken, mockApi, mockApiForm } from '../demo/staticDemoApi.js';

const BASE = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('token');
}

export async function api(path, options = {}) {
  if (isStaticDemoToken()) {
    return mockApi(path, options);
  }
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg = data?.message || data?.errors?.[0]?.msg || res.statusText;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function apiForm(path, formData, method = 'POST') {
  if (isStaticDemoToken()) {
    return mockApiForm(path, formData, method);
  }
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(`${BASE}${path}`, { method, body: formData, headers }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || res.statusText);
    return data;
  });
}
