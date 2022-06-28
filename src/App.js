import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {
  return (
    <>
    <NoteState>
      <Router>
        <div>
          <Navbar />
            
          <Alert message="Welcome To iNotebook"/>
          </div>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/About" element={<About />}></Route>
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
