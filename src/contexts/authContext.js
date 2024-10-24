import React, { createContext, useContext, useEffect, useState } from 'react'; // Import React hooks and context functions
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase Auth functions for state changes and sign-out
import { auth } from '../firebaseConfig'; // Import the Firebase auth instance from the config file

// Create a context to manage and share authentication state across the app
const AuthContext = createContext(null); // Initialize the context with a default value of null

// Custom hook to use the AuthContext easily in other components
export const useAuth = () => {
  const context = useContext(AuthContext); // Access the context
  if (context === undefined) { // Throw an error if context is used outside of its provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Return the context if it exists
};

// AuthProvider component to wrap around the app and manage authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to store the currently logged-in user
  const [loading, setLoading] = useState(true); // State to handle loading while checking auth status

  useEffect(() => {
    // Subscribe to Firebase Auth state changes (e.g., login/logout events)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user in the state
      setLoading(false); // Set loading to false once the user state is determined
    });

    // Cleanup the listener on component unmount
    return unsubscribe;
  }, []);

  // Provide the current user as context value to be used by other components
  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children if not loading */}
    </AuthContext.Provider>
  );
};

// Function to handle user logout
export const handleLogout = async () => {
  try {
    await signOut(auth); // Call Firebase signOut to log out the user
    console.log('User signed out successfully'); // Log success message
  } catch (error) {
    console.error('Error signing out:', error); // Log any errors that occur during sign-out
  }
};

