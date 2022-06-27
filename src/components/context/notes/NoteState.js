import { useState } from "react";
import NoteContext from "./noteContext";

export const NoteState = (props) => {
  const s1 = {
    "name": "dhaval",
    "class": "12c",
  }
  const [state, setState] = useState(s1);
  const update=()=>{
    setTimeout(()=>{
      setState({
        "name": "Harry",
        "class": "5C",
      })
    },1000);
  }
  return (
    <NoteContext.Provider value={{state,update}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
