import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function NoteItems(props) {
  const { note, handleEditClick, deleteNote } = props;

  return (
    <div className="card my-3 mx-3" style={{ width: "15rem" }}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h3 className="card-title">{note.title}</h3>
          <FontAwesomeIcon
            className="icon mx-3"
            icon={faPenToSquare}
            onClick={() => handleEditClick(note)}
          />
          <FontAwesomeIcon
            className="icon mx-3"
            icon={faTrash}
            onClick={() => deleteNote(note._id)}
          />
        </div>
        <h4 className="card-text">{note.description}</h4>
        <h5 className="card-text">Tag: {note.tag}</h5>
      </div>
    </div>
  );
}

export default NoteItems;
