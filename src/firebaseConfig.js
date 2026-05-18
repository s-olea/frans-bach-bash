import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD84OIruLstk9QnokiZy1d-medu-4Ils98",
  authDomain: "frans-bach-bash.firebaseapp.com",
  databaseURL: "https://frans-bach-bash-default-rtdb.firebaseio.com",
  projectId: "frans-bach-bash",
  storageBucket: "frans-bach-bash.firebasestorage.app",
  messagingSenderId: "273717150738",
  appId: "1:273717150738:web:86c502f0e0c7b379fa44cb"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
