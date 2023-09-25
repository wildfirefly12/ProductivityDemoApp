import "./Tasks.css";

import React, {useState} from "react";
import {useParams} from "react-router-dom";
import { AddBox } from "@mui/icons-material";
import NewTask from "./NewTask";
import TasksList from "./TasksList";
import TaskDetails from "./TaskDetails";

const Tasks = (props) => {   
    const { type } = useParams();

    const [updated, setUpdated] = useState(0);

    const handleUpdate = () => {
        setUpdated(updated + 1);
    }
    
    const [newTaskOpen, setNewTaskOpen] = useState(false);
    
    const handleOpenNewTask = () => {
        setNewTaskOpen(true);
    }
    
    const handleCloseNewTask = ()=> {
        setNewTaskOpen(false);
        handleUpdate()
    }

    const [selected, setSelected] = useState(null);

    const handleSetSelected = (task) => {
        setSelected(task);
    }
    
    return (
        <div className={"tasks-container"}>
            <div className={"tasks-header"}>
                <h2>Tasks - {type.slice(0, 1).toUpperCase() + type.slice(1)}</h2>
                <AddBox className={"tasks-add-btn"} fontSize={"large"} color={"secondary"} onClick={handleOpenNewTask}/>
            </div>
            <div className={"tasks-sections-container"}>
                <TasksList id={props.id} type={type} selected={selected} handleSetSelected={handleSetSelected} updated={updated} handleUpdate={handleUpdate}/>
                <TaskDetails id={props.id} task={selected} handleUpdate={handleUpdate} handleSetSelected={handleSetSelected}/>
            </div>
            {newTaskOpen && <NewTask id={props.id} handleCloseNewTask={handleCloseNewTask}/>}
        </div>
    )
}

export default Tasks