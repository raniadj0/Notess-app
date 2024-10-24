import Note from './Note';

const NotesList = ({ notes, handleDeleteNote, handleUpdateNote, handleLabelSelection }) => {
  // This component renders a list of notes by mapping through the notes array
  return (
    <div className='notes-list'>
      {/* Loop through the array of notes */}
      {notes.map((note) => (
        <Note
          key={note.id}           // Provide a unique key for each note 
          id={note.id}            
          title={note.title}      
          text={note.text}        
          date={note.date}        
          label={note.label}      
          handleDeleteNote={handleDeleteNote} // Pass down the function to delete a note
          handleUpdateNote={handleUpdateNote} // Pass down the function to update a note
          handleLabelSelection={handleLabelSelection} // Pass down the function to update the note's label
        />
      ))}
    </div>
  );
};

export default NotesList;
