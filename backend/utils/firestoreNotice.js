import { getFirestore } from '../config/firebase.js';
import { v4 as uuid } from 'uuid';

export async function syncNoticeToFirestore(doc) {
  const db = getFirestore();
  if (!db) return null;
  const id = doc.firestoreId || uuid();
  const ref = db.collection('notices').doc(id);
  await ref.set(
    {
      id,
      title: doc.title,
      body: doc.body || '',
      priority: doc.priority,
      audience: doc.audience,
      createdAt: doc.createdAt ? new Date(doc.createdAt).getTime() : Date.now(),
      mongoId: String(doc._id),
    },
    { merge: true }
  );
  return id;
}

export async function deleteNoticeFromFirestore(firestoreId) {
  const db = getFirestore();
  if (!db || !firestoreId) return;
  await db.collection('notices').doc(firestoreId).delete();
}
