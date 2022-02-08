import React from "react";
import { Spin as Hamburger } from "hamburger-react";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <div className="logo">
        <h1>#Music Player</h1>
      </div>
      <Hamburger
        toggled={libraryStatus}
        toggle={setLibraryStatus}
        className="hamburger"
      />
    </nav>
  );
};

export default Nav;
