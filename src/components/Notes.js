import React, { useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const ref = useRef(null);

  const updateNote = (note) => {
    console.log("updateNote called");
    ref.current.click();
  };

  return (
    <div className="container my-3">
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
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
            <NoteItems note={note} updateNote={updateNote} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
