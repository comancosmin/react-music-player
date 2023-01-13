import React from "react";
import { Spin as Hamburger } from "hamburger-react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const Nav = ({ libraryStatus, setLibraryStatus, toggleTheme1 }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={`nav-bar ${theme}`}>
      <div className="logo">
        <h1>React Music</h1>
      </div>
      <div className="theme-group">
        <div
          onClick={() => {
            toggleTheme();
            toggleTheme1();
          }}
          className="moon-sun"
        >
          {theme === "light" ? <FiMoon size={27} /> : <FiSun size={27} />}
        </div>
        <Hamburger
          toggled={libraryStatus}
          toggle={setLibraryStatus}
          className="hamburger"
        />
      </div>
    </nav>
  );
};

export default Nav;
