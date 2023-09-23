import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Resume from "./pages/Resume/Resume"; // Importa el componente Resume
import "../src/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume/:id" element={<Resume />} />{" "}
        {/* Utiliza el componente Resume */}
      </Routes>
    </Router>
  );
}

export default App;
