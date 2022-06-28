import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    // <div>{note.title}</div>
    <div className="col-md-3 my-2">
      <div className="card ">
        <div key={Math.random()} className="card-body  ">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <h6 className="card-subtitle mb-2 text-muted">{new Date(note.date).toGMTString()}</h6>
        <span class="badge  text-bg-primary">{note.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
