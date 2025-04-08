import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile, 
  User,
  GoogleAuthProvider,
  signInWithPopup 
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Firestore functions
export const saveReservation = async (
  userId: string,
  name: string,
  email: string,
  phone: string,
  date: string,
  time: string,
  guests: number,
  requests: string = ""
) => {
  try {
    const docRef = await addDoc(collection(db, "reservations"), {
      userId,
      name,
      email,
      phone, 
      date,
      time,
      guests,
      requests,
      status: "confirmed",
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserReservations = async (userId: string) => {
  try {
    const q = query(collection(db, "reservations"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const reservations: any[] = [];
    
    querySnapshot.forEach((doc) => {
      reservations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return reservations;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (reservationId: string, updatedData: any) => {
  try {
    const reservationRef = doc(db, "reservations", reservationId);
    await updateDoc(reservationRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export { auth, db };
