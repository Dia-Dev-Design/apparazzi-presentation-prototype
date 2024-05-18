import React from "react";
import { get } from "../authService/authService";
// import AppIcon from "../ApparaazziIcon.png";
import AppIcon from "../aperature_logo_red.jpg";

const Home = () => {
  React.useEffect(() => {
    let token = localStorage.getItem("authToken");
    console.log("This is the token", token);
    get("/users/login-test")
      .then((results) => {
        // console.log("Are we logged in?", results.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <h1 className="text-6xl">Welcome to Apparazzi!</h1>
        {/* className="text-6xl ..." on h1 element example to play around with Tailwind  CSS */}
        <img className="rounded-full" src={AppIcon} alt="apparazziIcon" />
        <h2
        className="homeText">Where anyone can be a Paparazzi!</h2>
        <button className="bg-sky-500 hover:bg-sky-700">
  Save changes
        </button>
      </div>
    </div>
  );
};

export default Home;
