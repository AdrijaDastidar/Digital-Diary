import React from "react";

const NoteItems = ({ note, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="card mb-3" style={{width: "16rem"}}>
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <h4 className="card-text">{note.description}</h4>
        <h5 className="card-subtitle">Tags : {note.tag}</h5>
        <button
          className="btn btn-warning me-2 my-3 mx-4"
          onClick={() => handleEditClick(note)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger mx-3"
          onClick={() => handleDeleteClick(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItems;
