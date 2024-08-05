import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateMovie from "./pages/CreateMovie";
import UpdateMovie from "./pages/UpdateMovie";
import MyMovies from "./pages/MyMovies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header> </Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/create-movie" element={<CreateMovie></CreateMovie>}></Route>
          <Route path="/update-movie/:id" element={<UpdateMovie ></UpdateMovie>} ></Route>
          <Route path="/my-movies" element={<MyMovies ></MyMovies>}> </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
