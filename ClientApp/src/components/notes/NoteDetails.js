import "./NoteDetails.css";

import React, {useEffect, useState} from "react";
import {Close, Edit} from "@mui/icons-material";
import {Autocomplete, Button, TextField} from "@mui/material";
import Tag from "../tags/Tag";
import axios from "axios";
import {TagDto} from "../../dtos/TagDto";
import {NoteDto} from "../../dtos/NoteDto";

const NoteDetails = (props) => {

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

    const [title, setTitle] = useState(props.note.title);
    const [content, setContent] = useState(props.note.content);
    const [color, setColor] = useState(props.note.color);
    const [tag, setTag] = useState(new TagDto());
    const [tags, setTags] = useState(props.note.tags || []);

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
            setTags([tag, ...tags]);
        } else{
            handleCreateNewTag();
        }
    }

    const [isEditing, setIsEditing] = useState(false);

    const handleSetIsEditing = (event, value) => {
        setIsEditing(value);
    }
    
    const handleEditNote = () => {
        let note;
        if(tags != null && tags.length > 0){
            note = new NoteDto(props.note.id, title, content, color, props.note.categoryId, props.userId, tags);
        } else {
            note = new NoteDto(props.note.id, title, content, color, props.note.categoryId, props.userId, null);
        }

        axios.post("api/Notes/Edit", note)
            .then(response => {
                console.log(response)
                props.handleSetUpdated();
            }).then(error => {
            console.log(error)
        })
        handleSetIsEditing(false);
    }
    
    return (
        <>
            {!isEditing && 
                <div style={{backgroundColor: props.note.color}} className={"note-details-container"}>
                    <div className={"note-details-header"}>
                        <p className={"note-title"}>{props.note.title}</p>
                        <div>
                            <Edit onClick={handleSetIsEditing.bind(this, true)}/>
                            <Close onClick={props.handleCloseNote}/>
                        </div>
                    </div>
                    <p>{new Date(props.note.createdDate).toLocaleString()}</p>
                    <p className={"note-content"}>{props.note.content}</p>
                </div>
            }
            {isEditing && 
                <div  style={{backgroundColor: props.note.color}} className={"note-details-container"}>
                    <Close sx={{alignSelf: "flex-end"}} onClick={handleSetIsEditing.bind(this, false)}/>
                    <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} value={title} label={"Title"} onChange={handleSetTitle}/>
                    <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} value={content} label={"Content"} multiline rows={6} onChange={handleSetContent}/>
                    <TextField sx={{marginLeft: "10px", width: "50px"}} size={"small"} variant={"outlined"} label={"Color"}
                               type={"color"} onChange={handleSetColor} value={color}/>
                    <div className={"note-tags-autocomplete-container"}>
                        <Autocomplete
                            freeSolo
                            onChange={handleSetTag}
                            disablePortal
                            id="combo-box-demo"
                            options={existingTags}
                            getOptionLabel={(option) => option.description}
                            sx={{ width: 250 }}
                            renderInput={(params) => <TextField {...params} label="Tag" size={"small"} sx={{margin: "10px"}} onChange={handleSetNewTag}/>}
                        />
                        <Button sx={{width: "100px", alignSelf: "center", marginLeft: "20px"}} variant={"contained"} color={"secondary"} onClick={handleSetTags}>Add Tag</Button>
                    </div>
                    <div className={"new-task-tags-container"}>
                        {tags && tags.map(tag =>
                            <Tag tag={tag} noteId={props.note.id} />
                        )}
                    </div>
                    <Button sx={{width: "100px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"} onClick={handleEditNote}>Save</Button>
                </div>
            }
        </>
    )
}

export default NoteDetails