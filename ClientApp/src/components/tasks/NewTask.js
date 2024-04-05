﻿import "./NewTask.css";

import React, {useEffect, useState} from "react";
import {Autocomplete, Button, Checkbox, FormControlLabel, MenuItem, Select, TextField} from "@mui/material";
import {Close} from "@mui/icons-material";
import axios from "axios";
import {TagDto} from "../../dtos/TagDto";
import {TaskDto} from "../../dtos/TaskDto";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Tag from "../tags/Tag";

const moment = require("moment");

const NewTask = (props) => {
    
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
    const [color, setColor] = useState("");    
    const handleSetNewTag = (event) => {
        setNewTag(event.target.value);
    }
    
    const handleSetColor = (event) => {
        setColor(event.target.value);
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
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState(2);
    const [description, setDescription] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [tag, setTag] = useState(new TagDto());
    const [tags, setTags] = useState([]);
    
    const handleSetTitle = (event) => {
        setTitle(event.target.value);
    }
    
    const handleSetPriority = (event) => {
        setPriority(event.target.value)
    }
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    }
    
    const handleSetIsRecurring = (event) => {
        setIsRecurring(event.target.data);
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
    
    const handleCreateNewTask = () => {
        let task;
        if(tags.length > 0){
            task = new TaskDto(null, title, description, moment(dueDate.$d).local().format(), priority, isRecurring, false, props.id, tags);
        } else {
            task = new TaskDto(null, title, description, moment(dueDate.$d).local().format(), priority, isRecurring, false, props.id);
        }
        
        axios.post("api/Tasks/Create", task, props.config)
            .then(response => {
                console.log(response);
                props.handleCloseNewTask();
            }).catch(error => {
                console.log(error);
        })
    }
    
    return(
        <div className={"new-task-container"}>
            <Close sx={{alignSelf: "flex-end", marginBottom: "5px"}} onClick={props.handleCloseNewTask}/>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Title"} onChange={handleSetTitle}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker sx={{margin: "10px"}}
                                size={"small"}
                                variant={"outlined"}
                                label={"Due Date"}
                                value={dueDate}
                                format="MMM DD, YYYY hh:mm A"
                                onChange={(newValue) => setDueDate(newValue)}/>
            </LocalizationProvider>
            <Select sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Title"} onChange={handleSetPriority}>
                <MenuItem value={2}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={0}>High</MenuItem>
            </Select>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Description"} multiline rows={6} onChange={handleSetDescription}/>
            <FormControlLabel control={<Checkbox sx={{marginLeft: "10px"}} size={"small"}  />} label={"Recurring"} onChange={handleSetIsRecurring}/>
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
{/*                <TextField sx={{marginLeft: "20px", width: "50px"}} size={"small"} variant={"outlined"} label={"Color"}
                            type={"color"} onChange={handleSetColor} value={color}/>*/}
                <Button sx={{width: "120px", alignSelf: "center", marginLeft: "20px"}} variant={"contained"} color={"secondary"} onClick={handleSetTags}>Add Tag</Button>
            </div>
            <div className={"new-task-tags-container"}>
                {tags && tags.map(tag => 
                    <Tag tag={tag} />
                )}
            </div>
            <Button sx={{width: "120px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"} onClick={handleCreateNewTask}>Save</Button>
        </div>
    )
}

export default NewTask