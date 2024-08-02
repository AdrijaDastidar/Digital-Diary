import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';

const Notes = () => {
  const { notes, setNotes } = useContext(NoteContext);

  return (
    <div className='container my-3'>
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItems note = {note}/>
      })}
    </div>
  );
}

export default Notes;
