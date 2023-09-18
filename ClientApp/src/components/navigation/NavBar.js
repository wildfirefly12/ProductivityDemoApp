import "./NavBar.css";

import React from "react";
import {Home} from "@mui/icons-material";

const NavBar = (props) => {
    
    
    return (
        <div className={"navbar-container"}>
            <div className={"navbar-dashboard-link"}>
                <Home/>
                <p>Dashboard</p>
            </div>
        </div>
    )
}

export default NavBar;