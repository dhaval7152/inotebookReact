import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState = (props) => {
  const notesIntial = [
    {
      _id: "62b816e64d4fe6dcf49cdf67",
      user: "62b2902ff826173207751401",
      title: "Study Plan",
      description: "Wake up early at 6'oClock",
      tag: "Study",
      date: "2022-06-26T08:20:54.817Z",
      __v: 0,
    },
    {
      _id: "62b816e64d4fe6dcf49cdf69",
      user: "62b2902ff826173207751401",
      title: "Study Plan",
      description: "Wake up early at 6'oClock",
      tag: "Study",
      date: "2022-06-26T08:20:54.993Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesIntial)

// Add A Note
const addNote=(title,description,tag)=>{
  console.log("ADDING NOTES>>")
   const note={
    _id: "62b816e64d4fe6dcf49cdf69",
    user: "62b2902ff826173207751401",
    title: title,
    description: description,
    tag: tag,
    date: "2022-06-26T08:20:54.993Z",
    __v: 0,
  };
  setNotes(notes.concat(note))

}


// Delete A Note
const deleteNote=(id)=>{
  const newNotes=notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
  
}


// Edit A Note
const editNote=(id,title,description,tag)=>{
  
}

  return (
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
