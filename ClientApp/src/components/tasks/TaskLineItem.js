import "./TaskLineItem.css";

import React, {useState} from "react";
import {CheckBox} from "@mui/icons-material";
import Tag from "../tags/Tag";
import {Checkbox} from "@mui/material";
import axios from "axios";
import {TaskDto} from "../../dtos/TaskDto";

const TaskLineItem = (props) => {
    
    const [tags, setTags] = useState([])

    const selectedBackground = props.selected ? "#FFCCAA" : "transparent";
    
    const [isComplete, setIsComplete] = useState(props.task.isComplete || false);
    
    const handleMarkComplete = (event) => {
        setIsComplete(!isComplete);
        
        const task = new TaskDto(
            props.task.id, 
            props.task.title, 
            props.task.description, 
            props.task.dueDate, 
            props.task.priority, 
            props.task.isRecurring, 
            event.target.checked, 
            props.task.userId)
        
        axios.post("api/Tasks/Edit", task, props.config)
            .then(response => {
                console.log(response)
                props.handleUpdate()
            }).catch(error => {
                console.log(error)
        })
    }
    
    return (
        <div className={"task-line-item-container"} style={{backgroundColor: selectedBackground}} >
            <Checkbox checked={isComplete} sx={{padding: 0, margin: 0}} onChange={handleMarkComplete}/>
            <p className={"task-line-item-title"} onClick={props.handleSetSelected.bind(this, props.task)}>{props.task.title}</p>
            {tags.map((tag, i) => 
                <Tag key={i} className={"task-tag"} tag={tag}/>
            )}
        </div>
    )
}

export default TaskLineItem