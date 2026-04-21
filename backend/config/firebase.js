import admin from 'firebase-admin';

let initialized = false;

export function initFirebase() {
  if (initialized) return admin;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    initialized = true;
    console.log('Firebase Admin initialized');
  } else {
    console.warn('Firebase not configured — Firestore/Storage features disabled');
  }
  return admin;
}

export function getFirebase() {
  if (!initialized) return null;
  return admin;
}

export function getFirestore() {
  const fb = getFirebase();
  return fb ? fb.firestore() : null;
}

export function getBucket() {
  const fb = getFirebase();
  if (!fb || !process.env.FIREBASE_STORAGE_BUCKET) return null;
  return fb.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
}
