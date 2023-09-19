import "./NewTask.css";

import React from "react";
import {Button, Checkbox, FormControlLabel, MenuItem, Select, TextField} from "@mui/material";
import {Dropdown} from "reactstrap";
import {Close} from "@mui/icons-material";

const NewTask = (props) => {
    
    
    return(
        <div className={"new-task-container"}>
            <Close sx={{alignSelf: "flex-end", marginBottom: "5px"}} onClick={props.handleCloseNewTask}/>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Title"}/>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Due Date"} type={"date"}/>
            <Select sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Title"}>
                <MenuItem value={2}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={0}>High</MenuItem>
            </Select>
            <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Due Date"} multiline maxRows={6}/>
            <FormControlLabel control={<Checkbox sx={{marginLeft: "10px"}} size={"small"}  />} label={"Recurring"}/>
            <div className={"new-task-add-tag"}>
                <TextField sx={{margin: "10px"}} size={"small"} variant={"outlined"} label={"Tag"} />
                <Button variant={"contained"} color={"secondary"}>Add Tag</Button>
            </div>
            <Button sx={{width: "100px", alignSelf: "flex-end"}} variant={"contained"} color={"secondary"}>Add Task</Button>
        </div>
    )
}

export default NewTask