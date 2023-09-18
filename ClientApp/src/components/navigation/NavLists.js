import "./NavLists.css";
import React, {useState} from "react";
import {Category, TaskOutlined} from "@mui/icons-material";
import {Divider} from "@mui/material";

const NavLists = () => {

    const [categories, setCategories] = useState([]);

    return (
        <div>
            <div className={"nav-lists-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}} />
                <p className={"navbar-lists-title-text"}>Lists</p>
            </div>
            <Divider color={"darkgray"} sx={{marginBottom: "5px"}}/>
            {categories.map(category =>
                <Category category={category} />
            )}
        </div>
    )
}

export default NavLists;