import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import UpdateNote from "./UpdateNote";
const Notes = (props) => {
  const {showAlert}=props;
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
   

  };

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
    closeRef.current.click();
    showAlert("Updated Notes!","success")

  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

  };

  return (
    <>
      <AddNote showAlert={showAlert}/>
      <UpdateNote updateNote={updateNote} click={ref} closeRef={closeRef}  onChange={onChange} handleClick={handleClick} note={note} showAlert={showAlert} />
      
      <div className="row my-2">
        <div className="container mx-3">
          {notes.length===0 && 'No Notes Found'}
        </div>
          {notes.map((note) => {
          // <div key={Math.random()}>{note.title }</div>
          return (
            <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
