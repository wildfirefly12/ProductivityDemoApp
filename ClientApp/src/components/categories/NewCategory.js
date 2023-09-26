import "./NewCategory.css";

import React, {useState} from "react";
import {Close} from "@mui/icons-material";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {CategoryDto} from "../../dtos/CategoryDto";

const NewCategory = (props) => {
    
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#e3e3e3");

    const handleSetDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleSetColor = (event) => {
        setColor(event.target.value);
    }
    
    const handleCreateCategory = () => {
        const category = new CategoryDto(null, description, color, true, false, props.id);
        
        axios.post("api/Categories/Create", category)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div className={"new-category-container"}>
            <Close sx={{alignSelf: "flex-end", marginBottom: "20px"}} onClick={props.handleSetIsCreating.bind(this, false)}/>
            <div className={"edit-tag-text-fields"}>
                <TextField sx={{marginBottom: "20px"}} size={"small"} variant={"outlined"} label={"Description"}
                           onChange={handleSetDescription} value={description}/>
                <TextField sx={{marginLeft: "20px", width: "50px"}} size={"small"} variant={"outlined"} label={"Color"}
                           type={"color"} onChange={handleSetColor} value={color}/>
            </div>
            <Button sx={{width: "120px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"} onClick={handleCreateCategory}>Save</Button>
        </div>
    )
}

export default NewCategory