import React from "react";
import { useState } from "react";
import NavBar from "./components/NavBar";     // import NavBar 
import Banner from "./components/Banner";   // import Banner 
import 'bootstrap/dist/css/bootstrap.min.css';   // BootStrap
import NewsSection from "./components/NewsSection"; // NewsSection
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import Connect from "./components/Connect";





const App = () => {

  const [currentPage, setCurrentPage] = useState("home");


  return (

    <div>
      {/* Pass setCurrentPage to NavBar so it can control navigation */}
      <NavBar setCurrentPage={setCurrentPage} />

      {/* Conditional Rendering for Pages */}
      {currentPage === "home" ? (
        <>
          <Banner />
          <div className="news-heading">
            Latest News
          </div>
          <NewsSection />
          <Connect/>
        </>
      ) : (
        <Favorites />
      )}
    </div>

);
}
export default App;



