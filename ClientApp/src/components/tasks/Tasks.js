import "./Tasks.css";

import React from "react";
import {useParams} from "react-router-dom";
import { AddBox } from "@mui/icons-material";

const Tasks = () => {   
    const { type } = useParams();
    
    return (
        <div className={"tasks-container"}>
            <div className={"tasks-header"}>
                <h2>Tasks - {type.slice(0, 1).toUpperCase() + type.slice(1)}</h2>
                <AddBox className={"tasks-add-btn"} fontSize={"large"} color={"secondary"}/>
            </div>
        </div>
    )
}

export default Tasks