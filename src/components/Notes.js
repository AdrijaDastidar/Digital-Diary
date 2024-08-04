import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className="container my-3">
      <h2>Your Notes</h2>
      <div className="row">
        {notes.map((note) => {
          return (
            <div className="col-md-4" key={note._id}>
              <NoteItems note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
