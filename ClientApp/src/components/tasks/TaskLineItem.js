import "./TaskLineItem.css";

import React, {useState} from "react";
import {CheckBox} from "@mui/icons-material";
import Tag from "../tags/Tag";

const TaskLineItem = (props) => {
    
    const [tags, setTags] = useState([])
    
    return (
        <div>
            <CheckBox/>
            <p>{props.task.title}</p>
            {tags.map(tag => 
                <Tag className={"task-tag"} tag={tag}/>
            )}
        </div>
    )
}

export default TaskLineItem