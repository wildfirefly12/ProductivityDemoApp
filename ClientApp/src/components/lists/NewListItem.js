import "./NewListItem.css";

import React, {useState} from "react";
import {Button, FormControl, TextField} from "@mui/material";
import {ListItemDto} from "../../dtos/ListItemDto";
import axios from "axios";

const NewListItem = (props) => {
    
    const [description, setDescription] = useState("");
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    } 
    
    const createNewListItem = () => {
        const listItem = new ListItemDto(null, description, false, props.id);
        
        axios.post("api/ListItems/Create", listItem)
            .then(response => {
                console.log(response);
                props.handleSetUpdate();
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div>
            <FormControl>
                <TextField size={"small"} onChange={handleSetDescription}/>
            </FormControl>
            <Button sx={{marginLeft: 2}} variant={"contained"} onClick={createNewListItem}>Save</Button>
        </div>
    )
}

export default NewListItem