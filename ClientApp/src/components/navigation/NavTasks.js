import "./NavTasks.css";

import React from "react";
import {Task, TaskOutlined} from "@mui/icons-material";
import {Divider} from "@mui/material";
import {Link} from "react-router-dom";

const NavTasks = (props) => {
    
    
    return (
        <div className={"nav-tasks-container"}>
            <div className={"nav-tasks-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}} />
                <p className={"navbar-task-title-text"}>Tasks</p>
            </div>
            <Divider color={"darkgray"} sx={{marginBottom: "5px"}}/>
            <Link className={"navbar-link"} to={"/tasks/today"}>
                <p className={"nav-tasks-subcategory"}>Today</p>
            </Link>
            <Link className={"navbar-link"} to={""}>
                <p className={"nav-tasks-subcategory"}>Pending</p>
            </Link>
            <Link className={"navbar-link"} to={""}>
                <p className={"nav-tasks-subcategory"}>Overdue</p>
            </Link>
            <Link className={"navbar-link"} to={""}>
                <p className={"nav-tasks-subcategory"}>Completed</p>
            </Link>
            <Link className={"navbar-link"} to={""}>
                <p className={"nav-tasks-subcategory"}>Recurring</p>
            </Link>
        </div>
    )
}

export default NavTasks