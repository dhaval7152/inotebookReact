import React, { useContext,useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes()

  
  }, [])
  

  return (
    <>
      <AddNote />
      <div className="row my-3">
        {notes.map((note) => {
          // <div key={Math.random()}>{note.title }</div>
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
