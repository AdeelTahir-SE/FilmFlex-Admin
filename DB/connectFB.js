import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  doc,
setDoc,
  updateDoc,
  collection,
  where,
  onSnapshot,
  getDocs,
  query
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore instance
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true // Enables long polling for real-time updates
});

export const createMovieStructure = async (movieId, day, timing, seatNumber, seatType, userId=null) => {
    try {
      // Reference the Firestore collection for movies
      const movieRef = doc(collection(db, "movies"), movieId);
  
      // Add movie data if it doesn't exist
      await setDoc(movieRef, { name:movieId }, { merge: true });
  
      // Reference the sub-collection for days
      const dayRef = doc(collection(movieRef, "days"), day);
      await setDoc(dayRef, { name: day }, { merge: true });
  
      // Reference the sub-collection for timings
      const timingRef = doc(collection(dayRef, "timings"), timing);
      await setDoc(timingRef, { name: timing }, { merge: true });
  
      // Reference the sub-collection for seats
      const seatRef = doc(collection(timingRef, "seats"), `seat_${seatNumber}`);
      await setDoc(seatRef, {
        seatNumber,
        seatType,
        userId,
        timing,
      });
  
      console.log("Movie structure created successfully!");
    } catch (error) {
      console.error("Error creating movie structure:", error);
    }
  };
  
