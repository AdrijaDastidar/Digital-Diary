import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, updateNote } = context;

  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleEditClick = (note) => {
    setCurrentNote(note);
  };

  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    if (currentNote) {
      updateNote(
        currentNote._id,
        currentNote.title,
        currentNote.description,
        currentNote.tag
      );
      setCurrentNote(null); // Hide the form after saving
    }
  };

  return (
    <div className="container my-3">
      <h2>Your Notes</h2>
      
      {/* Edit Form */}
      {currentNote && (
        <div className="edit-form mb-4">
          <h3>Edit Note</h3>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Edit title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter the title"
              name="title"
              value={currentNote.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Edit description
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              rows="5"
              placeholder="Capture your thoughts here..."
              value={currentNote.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Edit Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="Enter the tags"
              name="tag"
              value={currentNote.tag}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveClick}
          >
            Save changes
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setCurrentNote(null)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4" key={note._id}>
            <NoteItems note={note} handleEditClick={handleEditClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
