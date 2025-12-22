import { initializeApp } from "firebase/app"
import { getFirestore, Firestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB9E_dSkQdYGpXtHNJVK5o5p_mq5V7liCE",
  authDomain: "joulupukinkontti-c3aa6.firebaseapp.com",
  projectId: "joulupukinkontti-c3aa6",
  storageBucket: "joulupukinkontti-c3aa6.firebasestorage.app",
  messagingSenderId: "250922042568",
  appId: "1:250922042568:web:cb4de76019a8841859d1fd"
}

const app = initializeApp(firebaseConfig)
const firestore: Firestore = getFirestore(app)

const WISHES: string = 'wishes'

export { 
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    getAuth, 
    signInWithEmailAndPassword,
    deleteDoc,
    doc,
    WISHES
}