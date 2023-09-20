import "./TaskLineItem.css";

import React, {useState} from "react";
import {CheckBox} from "@mui/icons-material";
import Tag from "../tags/Tag";
import {Checkbox} from "@mui/material";

const TaskLineItem = (props) => {
    
    const [tags, setTags] = useState([])

    const selectedBackground = props.selected ? "#FFCCAA" : "transparent";
    
    return (
        <div className={"task-line-item-container"} style={{backgroundColor: selectedBackground}} >
            <Checkbox value={props.task.isComplete} sx={{padding: 0, margin: 0}}/>
            <p className={"task-line-item-title"} onClick={props.handleSetSelected.bind(this, props.task)}>{props.task.title}</p>
            {tags.map((tag, i) => 
                <Tag key={i} className={"task-tag"} tag={tag}/>
            )}
        </div>
    )
}

export default TaskLineItem