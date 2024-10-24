import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, title, text, date, handleDeleteNote, handleUpdateNote, handleLabelSelection, label }) => {
  // Manage the selected label (or default to 'Category')
  const [selectedLabel, setSelectedLabel] = useState(label || 'Category');

  // Helper function to format the date in MM/DD/YYYY format
  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;  // Months are zero-based, so +1
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;  // Return date in correct format
  };

  // Format the note's date or use the current date if undefined
  const formattedDate = date ? formatDate(date) : formatDate(new Date());

  // Handle title changes and pass the updated title to the parent function
  const handleTitleChange = (e) => {
    handleUpdateNote(id, e.target.value, text);  // Only update the title
  };

  // Handle text changes and pass the updated body to the parent function
  const handleTextChange = (e) => {
    handleUpdateNote(id, title, e.target.value);  // Only update the text
  };

  // Update the selected label and notify the parent component
  const handleCategorySelect = (category) => {
    setSelectedLabel(category);  // Set the new selected category
    handleLabelSelection(id, category);  // Pass the new label to the parent
  };

  return (
    <div className={`note ${selectedLabel === 'Work' ? 'note-work' : 
      selectedLabel === 'Personal' ? 'note-personal' : 
      selectedLabel === 'School' ? 'note-school' : ''}`}>
      
      {/* Title input field, updates when changed */}
      <input
        type='text'
        value={title}
        onChange={handleTitleChange}
        className='note-title'
        placeholder='Enter title...'
      />

      {/* Text area for the note body, updates when changed */}
      <textarea
        value={text}
        onChange={handleTextChange}
        className='note-body'
        placeholder='Enter your note here...'
      />

      {/* Dropdown for selecting the category (label) */}
      <div className='dropdown'>
        <button
          className={`btn dropdown-toggle ${selectedLabel === 'Work' ? 'label-work' : 
            selectedLabel === 'Personal' ? 'label-personal' : 
            selectedLabel === 'School' ? 'label-school' : ''}`}
          type='button'
          id='dropdownMenuButton'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {selectedLabel}  {/* Show the selected label or default to 'Category' */}
        </button>

        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          {/* Buttons to select a specific category */}
          <li>
            <button className='dropdown-item' onClick={() => handleCategorySelect('Work')}>
              Work
            </button>
          </li>
          <li>
            <button className='dropdown-item' onClick={() => handleCategorySelect('Personal')}>
              Personal
            </button>
          </li>
          <li>
            <button className='dropdown-item' onClick={() => handleCategorySelect('School')}>
              School
            </button>
          </li>
        </ul>
      </div>

      <div className='note-footer'>
        {/* Display the formatted date */}
        <small>{formattedDate}</small>
        
        {/* Delete icon to remove the note when clicked */}
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}  // Call the delete function
          className='delete-icon'
          size='1.3em'
        />
      </div>
    </div>
  );
};

export default Note;






