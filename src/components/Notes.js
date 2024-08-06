import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";
import { Modal } from "bootstrap";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, updateNote } = context;

  const [currentNote, setCurrentNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });

  const ref = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleUpdateClick = (note) => {
    setCurrentNote(note);
    const modal = new Modal(modalRef.current);
    modal.show();
  };

  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    updateNote(
      currentNote._id,
      currentNote.title,
      currentNote.description,
      currentNote.tag
    );
  };

  return (
    <div className="container my-3">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveClick}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4" key={note._id}>
            <NoteItems note={note} updateNote={handleUpdateClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
