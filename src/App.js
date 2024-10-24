import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { MdAddBox } from 'react-icons/md';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotesList from './components/NotesList';
import Login from './components/login';
import Signup from './components/Signup';
import './index.css';
import { handleLogout } from './contexts/authContext'; // Import the logout function
import { db } from './firebaseConfig'; // Import Firestore instance
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'; 

const App = () => {
  const [notes, setNotes] = useState([]); // Store notes in state
  const notesCollectionRef = collection(db, 'notesApp'); // Firestore collection reference
  const navigate = useNavigate(); // For navigation

  // Get the current route path
  const location = useLocation();
  const noHeaderPaths = ['/login', '/signup']; // Pages where the header should be hidden

  // Fetch notes from Firestore when the component loads
  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(notesCollectionRef);
      const fetchedNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes); // Update state with the fetched notes
    };

    fetchNotes();
  }, []);

  // Add a new note to Firestore and update the state
  const addNote = async () => {
    const newNote = {
      id: nanoid(),
      title: 'Untitled',
      text: 'New note',
      date: new Date().toLocaleDateString(),
      label: 'Category',
    };

    const docRef = await addDoc(notesCollectionRef, newNote); // Add to Firestore
    newNote.id = docRef.id; // Set the Firestore ID in the note
    setNotes([...notes, newNote]); // Update state
  };

  // Delete a note from Firestore and update the state
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notesApp', id)); // Delete from Firestore
    const newNotes = notes.filter((note) => note.id !== id); // Remove from state
    setNotes(newNotes);
  };

  // Update a note in Firestore and state
  const updateNote = async (id, newTitle, newText) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: newTitle || note.title || 'Untitled', // Fallback if no title
          text: newText || note.text || 'New note',    // Fallback if no text
        };
      }
      return note;
    });

    setNotes(updatedNotes); // Update state

    // Find the updated note and push changes to Firestore
    const noteToUpdate = updatedNotes.find((note) => note.id === id);
    if (noteToUpdate) {
      await updateDoc(doc(db, 'notesApp', id), {
        title: noteToUpdate.title,
        text: noteToUpdate.text,
        date: noteToUpdate.date || new Date().toLocaleDateString(), // Ensure date is set
        label: noteToUpdate.label || 'Category', // Ensure label is set
      });
    }
  };

  // Update the label of a note
  const updateLabel = async (id, newLabel) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, label: newLabel || note.label || 'Category' }; // Fallback if no label
      }
      return note;
    });
    setNotes(updatedNotes); // Update state

    const noteToUpdate = updatedNotes.find((note) => note.id === id);
    if (noteToUpdate) {
      await updateDoc(doc(db, 'notesApp', id), {
        label: noteToUpdate.label,
      });
    }
  };

  // Handle logout and navigate to login page
  const handleLogoutClick = async () => {
    try {
      await handleLogout(); // Call the logout function
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {/* Conditionally render header based on the route */}
      {!noHeaderPaths.includes(location.pathname) && (
        <header className="app-header">
          <div className="header-left">
            <h1>Notess</h1>
          </div>
          <div className="header-right">
            <button onClick={handleLogoutClick} className="logout-button">
              Logout
            </button>
          </div>
        </header>
      )}

      <div className="container">
        {/* Conditionally render the "My Notes" header */}
        {!noHeaderPaths.includes(location.pathname) && (
          <h2 className="notes-header">My Notes</h2>
        )}

        {/* Define routes */}
        <Routes>
          {/* Home page with note list */}
          <Route
            path="/"
            element={
              <>
                <div className="add-note-button">
                  <MdAddBox size="3em" onClick={addNote} />
                  <p>Add New Note</p>
                </div>
                <NotesList
                  notes={notes}
                  handleDeleteNote={deleteNote}
                  handleUpdateNote={updateNote}
                  handleLabelSelection={updateLabel}
                />
              </>
            }
          />
          {/* Login and Signup routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

















