import React, { useContext,useEffect } from 'react';
import noteContext from './context/notes/noteContext';
export const About = () => {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update()
     // eslint-disable-next-line                                                  
  },[])
  return (
    <div>
      <h1>This is  About {a.state.name} and his class is {a.state.class}</h1>
    </div>
  );
};

export default About;
