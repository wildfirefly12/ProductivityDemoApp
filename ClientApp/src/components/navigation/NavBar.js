import "./NavBar.css";

import React from "react";
import {Home, HomeOutlined} from "@mui/icons-material";
import NavTasks from "./NavTasks";
import NavNotes from "./NavNotes";
import NavLists from "./NavLists";
import NavTags from "./NavTags";
import {Divider} from "@mui/material";

const NavBar = (props) => {
    
    
    return (
        <div className={"navbar-container"}>
            <div className={"navbar-dashboard-link"}>
                <HomeOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}}/>
                <p className={"navbar-dashboard-text"}>Dashboard</p>
            </div>
            <Divider color={"darkgray"}/>
            <NavTasks />
            <NavNotes id={props.id} />
            <NavLists id={props.id} />
            <NavTags id={props.id} />
        </div>
    )
}

export default NavBar;