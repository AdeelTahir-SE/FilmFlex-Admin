import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  doc,
setDoc,
deleteDoc,
collection,
  where,
  onSnapshot,
  getDocs,
  query
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore instance
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true // Enables long polling for real-time updates
});
export const createMovieStructure = async (movieId, day, timing, seatNumber, seatType, userId = null) => {
    try {
      console.log("Creating movie structure for:", { movieId, day, timing, seatNumber, seatType, userId });
  
      const movieRef = doc(collection(db, "movies"), movieId);
      await setDoc(movieRef, { name: movieId, createdAt: new Date() });
  
      const dayRef = doc(collection(movieRef, "days"), day);
      await setDoc(dayRef, { name: day });
  
      const timingRef = doc(collection(dayRef, "timings"), timing);
      await setDoc(timingRef, { name: timing });
  
      const seatRef = doc(collection(timingRef, "seats"), `seat${seatNumber}`);
      await setDoc(seatRef, { seatNumber, seatType, userId,day,timing });
  
      console.log("Movie structure created successfully!");
    } catch (error) {
      console.error("Error creating movie structure:", error);
    }
  };
  
  

export const getReservedMovies = async () => {
  try {
    const moviesRef = collection(db, "movies");
    const userMovies = [];

    const querySnapshot = await getDocs(moviesRef);

    // Iterate through each movie document
    for (const doc of querySnapshot.docs) {
      const movieId = doc.id;

      const daysRef = collection(db, "movies", movieId, "days");
      const daysSnapshot = await getDocs(daysRef);

      // Iterate through each day and timings
      for (const dayDoc of daysSnapshot.docs) {
        const day = dayDoc.id;
        const timingsRef = collection(db, "movies", movieId, "days", day, "timings");
        const timingsSnapshot = await getDocs(timingsRef);

        for (const timeDoc of timingsSnapshot.docs) {
          const time = timeDoc.id;

          const seatsRef = collection(db, "movies", movieId, "days", day, "timings", time, "seats");
          const seatQuery = query(seatsRef, where("userId", "!=", "null"));
          const seatSnapshot = await getDocs(seatQuery);

          if (!seatSnapshot.empty) {
            seatSnapshot.forEach((seatDoc) => {
              const seatId = seatDoc.id;
              const seatData = seatDoc.data(); // Get the seat data to extract the userId

              // Extract userId from the seat document
              const userId = seatData.userId;

              // Push the movie data with userId, seatId, day, and time
              userMovies.push({ movieId, userId, seatId, day, time });
            });
          }
        }
      }
    }

    return userMovies; // Return the list of movies with reserved seats and user details
  } catch (error) {
    console.error("Error fetching movies reserved by user:", error);
    throw new Error("Failed to fetch movies reserved by user");
  }
};
// lib/connectFb.js


// Function to fetch movies and check for reserved seats
// Function to fetch movies and check for reserved seats
export const fetchMoviesWithSeatStatus = async () => {
  try {
    const moviesRef = collection(db, "movies");
    const snapshot = await getDocs(moviesRef);
    const movieList = [];

    // Iterate over each movie to check if any seat is reserved
    for (const docSnapshot of snapshot.docs) {
      const movieId = docSnapshot.id;
      const movieData = docSnapshot.data();
      const daysRef = collection(doc(db, "movies", movieId), "days");

      const daysSnapshot = await getDocs(daysRef);
      const days = [];

      let hasReservedSeatsForMovie = false; // Flag to track if the movie has reserved seats

      // Check each day's timings and seat reservations
      for (const dayDoc of daysSnapshot.docs) {
        const dayData = dayDoc.data();
        const timingsRef = collection(dayDoc.ref, "timings");
        const timingsSnapshot = await getDocs(timingsRef);

        const timings = [];
        
        for (const timingDoc of timingsSnapshot.docs) {
          const timingData = timingDoc.data();
          const seatsRef = collection(timingDoc.ref, "seats");
          const seatsSnapshot = await getDocs(seatsRef);
          console.log(seatsSnapshot);
          const seats = [];
          let hasReservedSeats = false;

          for (const seatDoc of seatsSnapshot.docs) {
            const seatData = seatDoc.data();

            if (seatData.userId != null) {
              hasReservedSeats = true;
            }
          }

          timings.push({ ...timingData, seats, hasReservedSeats });
          
          if (hasReservedSeats) {
            hasReservedSeatsForMovie = true; // Set flag to true if any seat is reserved for this movie
          }
        }

        days.push({ ...dayData, timings });
      }

      if (hasReservedSeatsForMovie) {
      
        movieList.push({
          id: movieId,
        });
      }
    }

    return movieList;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Function to delete a movie
export const deleteMovie = async (movieId) => {
  try {
    // Delete movie document
    await deleteDoc(doc(db, "movies", movieId));
    console.log(`Movie with ID: ${movieId} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
};
