import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingCartContext from "../context/ShoppingCartContext";
import Home from "../pages/Home.tsx";
import Store from "../pages/Store.tsx";
import About from "../pages/About.tsx";
import Navbar from "../components/Navbar.tsx";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartContext>
        <Navbar />
        <MainContent />
      </ShoppingCartContext>
    </BrowserRouter>
  );
}

function MainContent(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
