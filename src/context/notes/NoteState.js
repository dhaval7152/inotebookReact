import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [];

  const [notes, setNotes] = useState(notesIntial);

  //  GetAll Notes
  // error finding notes ma j che tos odho

  const getNotes = async () => {
    // TODO:API CALL
try {
  
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("tokenAuth"),
      },
    });
    /* eslint-disable */
    const json = await response.json();
    setNotes(json);
  } catch (error) {
    console.error("While fetching Notes Something went wrong")
  }
  };
  
  // Add A Note

  const addNote = async (title, description, tag) => {
    // TODO:API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("tokenAuth"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note =await response.json();
    setNotes(notes.concat(note));
  };

  // Delete A Note
  const deleteNote = async (id) => {
    // TODO:API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("tokenAuth"),
      },
    });
    const json = response.json();
  // eslint-disable-next-line 
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit A Note
  const editNote = async (id, title, description, tag) => {
    // TODO:API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("tokenAuth"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))
    //LOGIC TO EDIT IN CLIENT
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
