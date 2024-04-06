import "./NewList.css";

import React, {useState} from "react";
import {Close} from "@mui/icons-material";
import {Autocomplete, Button, TextField} from "@mui/material";
import Tag from "../tags/Tag";
import axios from "axios";
import {ListDto} from "../../dtos/ListDto";

const NewList = (props) => {
    
    const [title, setTitle] = useState("");
    
    const handleSetTitle = (event) => {
        setTitle(event.target.value)
    }
    
    const createList = () => {
        const list = new ListDto(null, title, props.catId, props.userId);
        
        axios.post("api/Lists/Create", list , props.config)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div className={"new-note-container"}>
            <Close sx={{alignSelf: "flex-end", marginBottom: "5px"}}
                   onClick={props.handleOpenNewNote.bind(this, false)}/>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Title"}
                       onChange={handleSetTitle}/>
            {/*<div className={"tasks-tags-autocomplete-container"}>
                <Autocomplete
                    freeSolo
                    onChange={handleSetTag}
                    disablePortal
                    id="combo-box-demo"
                    options={existingTags}
                    getOptionLabel={(option) => option.description}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Tag" size={"small"} sx={{margin: "10px"}}
                                                        onChange={handleSetNewTag}/>}
                />
                <Button sx={{width: "120px", alignSelf: "center", marginLeft: "20px"}} variant={"contained"}
                        color={"secondary"} onClick={handleSetTags}>Add Tag</Button>
            </div>
            <div className={"new-task-tags-container"}>
                {tags && tags.map(tag =>
                    <Tag tag={tag}/>
                )}
            </div>*/}
            <Button sx={{width: "120px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"}
                    onClick={createList}>Save</Button>
        </div>
    )
}

export default NewList