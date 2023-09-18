import "./NavNotes.css";

import React, {useState} from "react";
import {Category, TaskOutlined} from "@mui/icons-material";
import {Divider} from "@mui/material";

const NavNotes = () => {
    
    const [categories, setCategories] = useState([]);
    
    return (
        <div>
            <div className={"nav-notes-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}} />
                <p className={"navbar-notes-title-text"}>Notes</p>
            </div>
            <Divider color={"darkgray"} sx={{marginBottom: "5px"}}/>
            {categories.map(category => 
                <Category category={category} />
            )}
        </div>
    )
}

export default NavNotes