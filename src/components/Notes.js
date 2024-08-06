import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, updateNote, deleteNote } = context;

  const [currentNote, setCurrentNote] = useState(null);
  const titleRef = useRef(null); // Ref for the title input field

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    if (currentNote) {
      titleRef.current.focus(); // Focus on the title input field when currentNote is set
    }
  }, [currentNote]);

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

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      deleteNote(id);
    }
  };

  return (
    <div className="container my-3">
      <h2>Your Notes</h2>
      <div className="row">
        {notes.length === 0 ? 'No Notes available' : notes.map((note) => (
          <div className="col-md-4" key={note._id}>
            <NoteItems 
              note={note} 
              handleEditClick={handleEditClick}
              handleDeleteClick={() => handleDeleteClick(note._id)}
            />
          </div>
        ))}
      </div>
      {/* Edit Form */}
      {currentNote && (
        <div className="edit-form mb-4">
          <h2>Edit Note</h2>
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
              ref={titleRef} 
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
    </div>
  );
};

export default Notes;
