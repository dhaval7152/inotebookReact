import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },3000)
  }

  return (
    <>
    <NoteState>
      <Router>
        <div>
          <Navbar showAlert={showAlert} />
            
          <Alert alert={alert}/>
          </div>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
          <Route exact path="/About" element={<About />}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
