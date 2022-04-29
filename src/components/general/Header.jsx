import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  const [clicked, setClicked] = useState(false);
  const handleHamClick = () => {
    setClicked(!clicked);
    // const navIcon = document.querySelector(".hamburgher");
    // // const navMenu = document.querySelector(".nav");
    // navIcon.addEventListener("click", () => {
    //   navIcon.classList.toggle("active");
    //   // navMenu.classList.toggle("active");
    // });
  };

  return (
    <header id="header">
      <section
        className="header_left
      "
      >
        <figure>
          <img src={logo} alt="virus illustration" />
        </figure>
        <h1>COVID-19 Dashboard</h1>
      </section>
      <nav className={clicked ? "active nav" : "nav"}>
        <ul>
          <li>
            <Link to="/global">Global Dashboard</Link>
          </li>
          <li>
            <Link to="/local">Local Dashboard</Link>
          </li>
        </ul>
        <div
          onClick={handleHamClick}
          className={clicked ? "active hamburgher" : "hamburgher"}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
