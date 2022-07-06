import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote,showAlert} = props;
  return (
    // <div>{note.title}</div>
    <div className="col-md-3 my-2">
      <div className="card ">
        <div key={note._id} className="card-body  ">
          <h5 className="card-title mx-2">
            {note.title}
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Deleted Note Succefully","success")
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);

              }}
            ></i>
          </h5>
          <p className="card-text">{note.description}</p>
          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(note.date).toGMTString()}
          </h6>
          {/* <span className="badge  text-bg-primary">{note.tag}</span> */}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
