import { initializeApp } from "firebase/app"
import { getFirestore, Firestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, onSnapshot } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID
}

const app = initializeApp(firebaseConfig)
const firestore: Firestore = getFirestore(app)

const MESSAGES: string = 'messages'

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
    MESSAGES
}