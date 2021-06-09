import React, { FC, useState } from "react";

const Navbar: FC = (): JSX.Element => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <a href="#" className="nav-logo">
            Codeddit
          </a>
          <ul className={hamburgerOpen ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">About</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">Github</li>
            <li className="nav-item">Contact</li>
          </ul>
          <div
            className={hamburgerOpen ? "hamburger active" : "hamburger"}
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
