import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieBio from "./components/MovieBio";
import Home from "./components/Home";
import Header from "./components/Header";
import Animation from "./components/Animation";

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
     <Routes>
      <Route path="/animation" element={<Animation />} />
      <Route path="/:field/:id" element={<MovieBio />} />
      <Route path="/" element={<Home />} />
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
