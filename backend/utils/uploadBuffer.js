import { getBucket } from '../config/firebase.js';
import { v4 as uuid } from 'uuid';

export async function uploadBufferToFirebase(pathPrefix, filename, buffer, contentType) {
  const bucket = getBucket();
  if (!bucket) {
    throw new Error('Firebase Storage not configured');
  }
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const dest = `${pathPrefix}/${uuid()}_${safeName}`;
  const file = bucket.file(dest);
  await file.save(buffer, {
    metadata: { contentType: contentType || 'application/octet-stream' },
    public: true,
  });
  try {
    await file.makePublic();
  } catch {
    /* bucket may use uniform access */
  }
  return `https://storage.googleapis.com/${bucket.name}/${dest}`;
}
