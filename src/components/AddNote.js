import React, { useState,useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote } = context;

    const clearFields=()=>{
      const titleValue = document.getElementById('title');
      const descriptionValue = document.getElementById('description');
      const tagValue = document.getElementById('tag');
      titleValue.value = '';
      descriptionValue.value = '';
      tagValue.value = '';
    }
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        clearFields();

    }
    const onChange=(e)=>{   
        setNote({...note,[e.target.name]:e.target.value})
    }

     return (
    <div>
      <div className="container my-3">
        <h1>Add Note</h1>
        <form className="my-3 ">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              aria-describedby="title"
            />
            
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
              onChange={onChange}

            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}

            />
          </div>
          
          
          <button type="submit" onClick={handleClick} className="btn btn-dark">
            Add Note
          </button>
        </form>
        <h2>Your Notes</h2>
      </div>
    </div>
  );
};

export default AddNote;
