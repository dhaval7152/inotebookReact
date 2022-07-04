import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const { showAlert } = props;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Added Note Succefully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-2">
        <h1>Add Note</h1>
        <form className="my-3 " >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={note.title}
              name="title"
              onChange={onChange}
              aria-describedby="title"
              minLength={5}
              required
            />
            <sub>Title Must be More than 5 characters</sub>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
            <sub>description Must be More than 5 characters</sub>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
            disabled={note.title.length <= 5 || note.description.length <= 5}
            type="submit"
            className="btn btn-dark" onClick={handleClick}
          >
            Add Note
          </button>
        </form>
        <h2>Your Notes</h2>
      </div>
    </div>
  );
};

export default AddNote;
