import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  deleteField,
} from "firebase/firestore";

// Las claves se leen de variables de entorno (ver README.md para configurarlas).
// Si no existen, la app funciona en "modo local" (un solo navegador, sin sincronizar
// con otros jugadores) para poder probar el prototipo sin configurar nada.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let db = null;
if (isFirebaseConfigured) {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db, doc, setDoc, updateDoc, onSnapshot, serverTimestamp, deleteField };
