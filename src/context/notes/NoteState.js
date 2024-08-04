import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNTIzOTMwODkyNTE1ZjIzODg3NzU5In0sImlhdCI6MTcyMjA5ODU3OX0.2OcMl--0vK2HVugOJr_8-WjbpvXuE4tWOW4WW0r70lw";
  const [notes, setNotes] = useState([]);


  //* Fetch All Notes
  const getNotes = async () => {
    // Server Side - API Calls
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch notes");
      return;
    }
    const json = await response.json();
    setNotes(json);
  };

  //* Add Note
  const addNote = async (title, description, tag) => {
    // Server Side - API Calls
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add note");
      }

      const newNote = await response.json();
      // Add a new note in client side
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } 
    catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

  //* Update Note
  const updateNote = async (id, title, description, tag) => {
    // Server Side - API Calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (!response.ok) {
      console.error("Failed to update note");
      return;
    }

    // Update in Client Side
    const updatedNote = await response.json();
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      )
    );
  };

  //* Delete Note
  const deleteNote = (id) => {
    fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    // Delete from Client Side
    const updatedNotes = notes.filter((n) => n._id !== id);
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
