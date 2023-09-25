import "./TaskDetails.css";

import React, {useState} from "react";
import {Edit, Event} from "@mui/icons-material";
import Tag from "../tags/Tag";
import EditTask from "./EditTask";

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
    
    const [isEditing, setIsEditing] = useState(false);
    
    const handleSetIsEditing = (value) => {
        setIsEditing(value);
    }
    
    
    
    return (
        <div className={"tasks-details-container"}>
            {props.task && <>
                <div className={"tasks-details-info-container"}>
                    <div className={"tasks-details-title"}>
                        <p>{props.task.title}</p>
                        <Edit color={"secondary"} onClick={handleSetIsEditing.bind(this, true)}/>
                    </div>
                    <div className={"tasks-details-date"}>
                        <Event/>
                        <p>{new Date(props.task.dueDate).toLocaleString()}</p>
                    </div>
                    <div className={"tasks-details-priority-container"}
                         style={{backgroundColor: priorities[props.task.priority].color}}>
                        <p className={"tasks-details-priority-text"}>{priorities[props.task.priority].text}</p>
                    </div>
                    <p>{props.task.description}</p>
                </div>
                <div className={"tasks-details-tags-container"}>
                    {props.task.tags && props.task.tags.map(t => 
                        <Tag key={t.id} tag={t} taskId={props.task.id} config={props.config} handleUpdate={props.handleUpdate} handleSetSelected={props.handleSetSelected}/>
                        )}
                </div>
            </>}
            {isEditing && <EditTask id={props.id} task={props.task} handleSetIsEditing={handleSetIsEditing} handleUpdate={props.handleUpdate} handleSetSelected={props.handleSetSelected}/>}
        </div>
    )
}

export default TaskDetails