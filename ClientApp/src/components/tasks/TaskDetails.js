import "./TaskDetails.css";

import React from "react";
import {Event} from "@mui/icons-material";

const TaskDetails = (props) => {
    
    const priorities = [
        {
            text: "High",
            color: "#eb3838"
        },
        {
            text: "Medium",
            color: "#ffcc54"
        },
        {
            text: "Low",
            color: "#3291a8"
        }
    ]
    
    return (
        <div className={"tasks-details-container"}>
            {props.task && <>
                <p className={"tasks-details-title"}>{props.task.title}</p>
                <div className={"tasks-details-date"}>
                    <Event/>
                    <p>{new Date(props.task.dueDate).toLocaleString()}</p>
                </div>
                <div className={"tasks-details-priority-container"}
                     style={{backgroundColor: priorities[props.task.priority].color}}>
                    <p className={"tasks-details-priority-text"}>{priorities[props.task.priority].text}</p>
                </div>
                <p>{props.task.description}</p>
            </>}
        </div>
    )
}

export default TaskDetails