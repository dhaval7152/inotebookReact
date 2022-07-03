import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [];

  const [notes, setNotes] = useState(notesIntial);

  //  GetAll Notes

  const getNotes = async () => {
    // TODO:API CALL
try {
  
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMjkwMmZmODI2MTczMjA3NzUxNDAxIn0sImlhdCI6MTY1NTkxMzg3NX0.lZolCKFzRWM_Pi9vWkCAOtlBCdFocU0vboJWlOTee5o",
      },
    });
    
    const json = await response.json();
    console.log(json);
    setNotes(json);
  } catch (error) {
    console.log("No Notes Available")
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMjkwMmZmODI2MTczMjA3NzUxNDAxIn0sImlhdCI6MTY1NTkxMzg3NX0.lZolCKFzRWM_Pi9vWkCAOtlBCdFocU0vboJWlOTee5o",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMjkwMmZmODI2MTczMjA3NzUxNDAxIn0sImlhdCI6MTY1NTkxMzg3NX0.lZolCKFzRWM_Pi9vWkCAOtlBCdFocU0vboJWlOTee5o",
      },
    });
    const json = response.json();
    console.log(json);

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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMjkwMmZmODI2MTczMjA3NzUxNDAxIn0sImlhdCI6MTY1NTkxMzg3NX0.lZolCKFzRWM_Pi9vWkCAOtlBCdFocU0vboJWlOTee5o",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

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
    // console.log(notes)
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
