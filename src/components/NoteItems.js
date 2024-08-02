import React from "react";

function NoteItems(props) {
  const { note } = props;
  return (
    <div className="card my-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
}

export default NoteItems;