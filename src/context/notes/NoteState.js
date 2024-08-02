import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const initialNotes = [
    {
      "_id": "66a683b3a618ccef0ce6d566",
      "user": "66a523930892515f23887759",
      "title": "First note",
      "description": "xyz xz lorem",
      "tag": "new",
      "date": "2024-07-28T17:45:23.791Z",
      "__v": 0
    },
    {
      "_id": "66a683b8a618ccef0ce6d568",
      "user": "66a523930892515f23887759",
      "title": "First note",
      "description": "xyz xz lorem",
      "tag": "new",
      "date": "2024-07-28T17:45:28.281Z",
      "__v": 0
    },
    {
      "_id": "66a683f5a618ccef0ce6d56e",
      "user": "66a523930892515f23887759",
      "title": "First not",
      "description": "QQxyz x lorem",
      "tag": "ne",
      "date": "2024-07-28T17:46:29.791Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(initialNotes);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
