import { initializeApp } from "firebase/app" ;
import { getDatabase } from "firebase/database" ;
import { getAuth } from "firebase/auth" ;

const firebaseConfig = 
{
  apiKey: "AIzaSyD_SCf2aCEA1wwxkxoKP-oy2PPpSSY8BB4",
  authDomain: "jaksoneducationsystem.firebaseapp.com",
  databaseURL: "https://jaksoneducationsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jaksoneducationsystem",
  storageBucket: "jaksoneducationsystem.appspot.com",
  messagingSenderId: "497612721967",
  appId: "1:497612721967:web:a7303029aee5ae22bb1bda"
} ;

// Initialize Firebase
const app = initializeApp(firebaseConfig) ;
const database = getDatabase(app) ;
const auth = getAuth(app) ;

// Export Database, GetData & Auth
export { database, auth } ;