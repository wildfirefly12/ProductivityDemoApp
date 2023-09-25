import "./Tag.css";

import React from "react";
import {Close} from "@mui/icons-material";
import axios from "axios";

const Tag = (props) => {
    
    const handleRemoveTag = () => {
        const data = new FormData();
        
        data.append("tagId", props.tag.id);
        data.append("taskId", props.taskId);
        data.append("noteId", props.noteId);
        data.append("listId", props.listId);
        
        axios.post("api/Tags/RemoveFromObject", data)
            .then(response => {
                console.log(response);
                props.handleUpdate();
                props.handleSetSelected(null);
            }).catch(error => {
                console.log(error)
        })
    }
    
    return (
        <div className={"tag-container"} style={{backgroundColor: props.tag.color}}>
            <p className={"tag-text"}>{props.tag.description}</p>
            <Close fontSize={"small"} onClick={handleRemoveTag} />
        </div>
    )
}

export default Tag