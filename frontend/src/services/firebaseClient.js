import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function isFirebaseConfigured() {
  return Boolean(cfg.apiKey && cfg.projectId);
}

let app;
export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(cfg);
  }
  return app;
}

export function getFirebaseAuth() {
  const a = getFirebaseApp();
  return a ? getAuth(a) : null;
}

export function getDb() {
  const a = getFirebaseApp();
  return a ? getFirestore(a) : null;
}

export function getFirebaseStorage() {
  const a = getFirebaseApp();
  return a ? getStorage(a) : null;
}

export const googleProvider = new GoogleAuthProvider();
