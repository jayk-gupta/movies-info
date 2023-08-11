import React from "react";
import Logo from "./UI/Logo";

import { useState } from "react";
function NavBar({children}) {

  return (
    <nav className="nav-bar">
      <Logo/>
    {children}
    </nav>
  );
}

export default NavBar;
