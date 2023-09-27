import "./NewNote.css";

import React, {useEffect, useState} from "react";
import {Close} from "@mui/icons-material";
import {Autocomplete, Button, TextField} from "@mui/material";
import {TagDto} from "../../dtos/TagDto";
import axios from "axios";
import Tag from "./Tag";
import {NoteDto} from "../../dtos/NoteDto";

const NewNote = (props) => {
    const [updated, setUpdated] = useState(0);
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }
    
    const [existingTags, setExistingTags] = useState([]);

    useEffect(() => {
        axios.get("api/Tags/ByUser", {
            params : {
                id: props.id
            }
        }).then(response => {
            setExistingTags(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [updated]);

    //creating tags
    const [newTag, setNewTag] = useState("");

    const handleSetNewTag = (event) => {
        setNewTag(event.target.value);
    }

    const handleCreateNewTag = () => {
        let value = new TagDto(null, newTag, "#E3E3E3", props.id);
        axios.post("api/Tags/Create", value, props.config)
            .then(response => {
                console.log(response);
                setTags([value, ...tags]);
                handleSetUpdated();
            }).catch(error => {
            console.log(error);
        })
    }
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [color, setColor] = useState("#e3e3e3");
    const [tag, setTag] = useState(new TagDto());
    const [tags, setTags] = useState([]);

    const handleSetTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleSetContent = (event) => {
        setContent(event.target.value)
    }

    const handleSetColor = (event) => {
        setColor(event.target.value);
    }

    const handleSetTag = (event, value) => {
        setTag(value);
    }

    const handleSetTags = () => {
        if(existingTags.some(t => t.id === tag.id)){
            console.log("addTag")
            setTags([tag, ...tags]);
        } else{
            handleCreateNewTag();
        }
    }
    
    const handleCreateNote = () => {
        let note;
        if(tags.length > 0){
            note = new NoteDto(null, title, content, color, props.categoryId, props.userId, tags);
        } else {
            note = new NoteDto(null, title, content, color, props.categoryId, props.userId, null);
        }
        
        axios.post("api/Notes/Create", note)
            .then(response => {
                console.log(response)
                props.handleOpenNewNote(false);
                props.handleSetUpdated();
            }).then(error => {
                console.log(error)
        })
    }
    
    return (
        <div className={"new-note-container"}>
            <Close sx={{alignSelf: "flex-end", marginBottom: "5px"}} onClick={props.handleOpenNewNote.bind(this, false)}/>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Title"} onChange={handleSetTitle}/>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Content"} multiline rows={6} onChange={handleSetContent}/>
            <TextField sx={{marginLeft: "10px", width: "50px"}} size={"small"} variant={"outlined"} label={"Color"}
                       type={"color"} onChange={handleSetColor} value={color}/>
            <div className={"tasks-tags-autocomplete-container"}>
                <Autocomplete
                    freeSolo
                    onChange={handleSetTag}
                    disablePortal
                    id="combo-box-demo"
                    options={existingTags}
                    getOptionLabel={(option) => option.description}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tag" size={"small"} sx={{margin: "10px"}} onChange={handleSetNewTag}/>}
                />
                <Button sx={{width: "120px", alignSelf: "center", marginLeft: "20px"}} variant={"contained"} color={"secondary"} onClick={handleSetTags}>Add Tag</Button>
            </div>
            <div className={"new-task-tags-container"}>
                {tags && tags.map(tag =>
                    <Tag tag={tag} />
                )}
            </div>
            <Button sx={{width: "120px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"} onClick={handleCreateNote}>Save</Button>
        </div>
    )
}

export default NewNote