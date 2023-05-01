import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateReceipe } from "./pages/create-receipe";
import { SaveReceipe } from "./pages/save-receipe";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-receipe" element={<CreateReceipe />} />
          <Route path="/save-receipe" element={<SaveReceipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
