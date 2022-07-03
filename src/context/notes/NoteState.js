import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [];

  const [notes, setNotes] = useState(notesIntial);

  //  GetAll Notes

  const getNotes = async () => {
    // TODO:API CALL

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

    console.log("ADDING NOTES>>");
    const note = {
      "_id": "62b816e64d4fe6dcf49cdf69",
      "user": "62b2902ff826173207751401",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-06-26T08:20:54.993Z",
      "__v": 0,
    };
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMjkwMmZmODI2MTczMjA3NzUxNDAxIn0sImlhdCI6MTY1NTkxMzg3NX0.lZolCKFzRWM_Pi9vWkCAOtlBCdFocU0vboJWlOTee5o",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    //LOGIC TO EDIT IN CLIENT
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
