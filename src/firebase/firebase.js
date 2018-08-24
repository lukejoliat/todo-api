import admin from 'firebase-admin';
import config from '../config/config';

const fb = admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: config.databaseURL,
});
const db = fb.firestore();
export { db };
export default fb;
