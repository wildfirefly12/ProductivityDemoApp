import "./Tasks.css";

import React, {useState} from "react";
import {useParams} from "react-router-dom";
import { AddBox } from "@mui/icons-material";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

const Tasks = (props) => {   
    const { type } = useParams();
    
    const [newTaskOpen, setNewTaskOpen] = useState(false);
    
    const handleOpenNewTask = () => {
        setNewTaskOpen(true);
    }
    
    const handleCloseNewTask = ()=> {
        setNewTaskOpen(false);
    }
    
    return (
        <div className={"tasks-container"}>
            <div className={"tasks-header"}>
                <h2>Tasks - {type.slice(0, 1).toUpperCase() + type.slice(1)}</h2>
                <AddBox className={"tasks-add-btn"} fontSize={"large"} color={"secondary"} onClick={handleOpenNewTask}/>
            </div>
            <TasksList id={props.id} />
            {newTaskOpen && <NewTask id={props.id} handleCloseNewTask={handleCloseNewTask}/>}
        </div>
    )
}

export default Tasks