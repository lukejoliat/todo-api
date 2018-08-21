import admin from 'firebase-admin';
import serviceAccount from '../keys/todo-969aa-firebase-adminsdk-u7f5y-e7a2eb6f5c.json';

const config = {
  port: 3000,
  databaseURL: 'https://todo-969aa.firebaseio.com',
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
});
const db = admin.firestore();

export { db };
export default config;
