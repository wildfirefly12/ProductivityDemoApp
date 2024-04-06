import "./EditListsCategory.css";

import React, {useState} from "react";
import {Button, FormControl, TextField, Typography} from "@mui/material";
import axios from "axios";
import {CategoryDto} from "../../dtos/CategoryDto";
import {CloseButton} from "reactstrap";

const EditListsCategory = (props) => {
    
    const [description, setDescription] = useState(props.category.description);
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    }
    
    const [color, setColor] = useState(props.category.color);
    
    const handleSetColor = (event) => {
        setColor(event.target.value);
    }
    
    const saveCategory = () => {
        const category = new CategoryDto(props.category.id, description, color, true, false, props.category.userId);
        axios.post("api/ListCategories/Edit", category, props.config)
            .then(response => {
                console.log(response);
                props.handleSetUpdated();
                props.closeEditor();
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div className={"edit-lists-category-container"}>
            <div className={"edit-lists-category-header-container"}>
                <Typography sx={{
                    fontFamily: "Passion One, sans-serif",
                    fontSize: "28px",
                    fontWeight: "bold",
                    textAlign: "center",
                    flexGrow: 1,
                    marginLeft: "10px"
                }}>Edit Category</Typography>
                <CloseButton onClick={props.closeEditor}/>
            </div>
            <div className={"edit-lists-category-form-container"}>
                <FormControl sx={{flexGrow: 1, margin: 1}}>
                    <TextField size={"small"} value={description} onChange={handleSetDescription}/>
                </FormControl>
                <FormControl sx={{width: "50px", margin: 1}}>
                    <TextField size={"small"} type={"color"} value={color} onChange={handleSetColor}/>
                </FormControl>
            </div>
            <Button sx={{alignSelf: "flex-end"}} variant={"contained"} onClick={saveCategory}>Save</Button>
        </div>
    )
}

export default EditListsCategory