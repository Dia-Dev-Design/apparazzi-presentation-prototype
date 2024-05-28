import React from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Tags from "./pages/Tags";
import AllPhotos from "./pages/AllPhotos";
import PhotoDetails from "./pages/PhotoDetail";
import EditProfile from "./pages/EditProfile";
import SubmitPhoto from "./pages/SubmitPhoto";
import TagDetails from "./pages/TagDetails";
import DeleteProfile from "./pages/DeleteProfile";
import Contributor from "./pages/Contributor";
import HomeButtonIcon from './apparazzihomebutton.png';
import AppIcon from "./ApparazziIcon.png";
import SubmitPhotoButton from "./apparazziSubmitPhotoButton.png";
import ProfileButton from "./ApparazziProfileButton.png";

function App() {
  const navigate = useNavigate();

  let token = localStorage.getItem("authToken");

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <div className="navbar">
        <header className="nav-wrapper">
          <div className="navIconContainer">
            <Link to="/" className="navIconImage">
              <img className="navIcon" src={AppIcon} alt="appIcon" />
            </Link>

            <h1 className="navHeadline">Apparazzi!</h1>
          </div>
          {token ? (
            <nav className="nav-items">
              <Link to="/" className="icon">
                <img className="HomeButtonIcon" src={HomeButtonIcon}></img></Link>
              {/*<Link to="">About us</Link>*/}
              {/*<Link to="">Inventory*/}
              {/*<Link to="">Notifications*/}
              <Link to="/allPhotos" className="icon">All Photos</Link>
              <Link to="/tags" type="submit" className="icon">Search</Link>
              <Link to="/submit-photo" className="icon">
                  <img className="SubmitPhotoButton" src={SubmitPhotoButton}></img></Link>
              <Link to="/profile" className="icon">
                  <img className="ProfileButtonImage" src={ProfileButton}></img></Link>
              <button onClick={logout} className="icon">Logout</button>
            </nav>
          ) : (
            <nav className="nav-items">
              <Link to="/" className="icon">Home</Link>
              <Link to="/signup" className="icon">Sign Up</Link>
              <Link to="/login" className="icon">Log In</Link>
            </nav>
          )}
        </header>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/allPhotos" element={<AllPhotos />}></Route>
        <Route path="/:id/details" element={<PhotoDetails />}></Route>
        <Route path="/:id/tag" element={<TagDetails />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/delete-profile" element={<DeleteProfile />}></Route>
        <Route path="/submit-photo" element={<SubmitPhoto />}></Route>
        <Route path="/:id/contributor" element={<Contributor />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
