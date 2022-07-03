import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import UpdateNote from "./UpdateNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    console.log("this is updatenote")
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };

  const handleClick = (e) => {
    console.log("updating Note.... ")
    console.log(note)
    e.preventDefault();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <UpdateNote updateNote={updateNote} click={ref}  onChange={onChange} handleClick={handleClick} note={note} />
      
      <div className="row my-3">
        {notes.map((note) => {
          // <div key={Math.random()}>{note.title }</div>
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
