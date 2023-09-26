import "./EditTag.css";

import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {TagDto} from "../../dtos/TagDto";
import {Close} from "@mui/icons-material";

const EditTag = (props) => {
    
    const [description, setDescription] = useState(props.tag.description);
    const [color, setColor] = useState(props.tag.color);
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value)
    }
    
    const handleSetColor = (event) => {
        setColor(event.target.value);
    }
    
    const handleEditTag = () => {
        const tag = new TagDto(props.tag.id, description, color, props.tag.userId);
        
        axios.post("api/Tags/Edit", tag)
            .then(response => {
                console.log(response);
                props.handleSetUpdated();
                props.handleSetIsEditing(false);
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div className={"edit-tag-container"}>
            <Close sx={{alignSelf: "flex-end", marginBottom: "20px"}} onClick={props.handleSetIsEditing.bind(this, false)}/>
            <div className={"edit-tag-text-fields"}>
                <TextField sx={{marginBottom: "20px"}} size={"small"} variant={"outlined"} label={"Description"}
                           onChange={handleSetDescription} value={description}/>
                <TextField sx={{marginLeft: "20px", width: "50px"}} size={"small"} variant={"outlined"} label={"Color"}
                           type={"color"} onChange={handleSetColor} value={color}/>
            </div>
            <Button sx={{width: "120px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"} onClick={handleEditTag}>Save</Button>
        </div>
    )
}

export default EditTag