import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import About from "./components/About";
import Note from "./components/Note"

import './App.css'

function App() {
return(
  <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path=":noteId" element={<Note/>}/>
      </Routes>
    </Router>
  </div>
)
}
export default App
