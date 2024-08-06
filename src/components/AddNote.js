import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Got a Spark of Inspiration?</h1>
      <h3>Seize the Moment and watch your ideas take flight!</h3>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">
          Note Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter the title"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Your Thoughts
        </label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          rows="5"
          onChange={handleChange}
          placeholder="Capture your thoughts here..."
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          placeholder="Enter the tags"
          name="tag"
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        className="btn submit-btn my-3"
        onClick={handleSubmit}
      >
        Add Note
      </button>
    </div>
  );
}

export default AddNote;
