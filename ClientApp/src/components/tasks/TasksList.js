import "./TasksList.css";

import React, {useEffect, useState} from "react";
import TasksSection from "./TasksSection";
import axios from "axios";

const TasksList = (props) => {
    
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("api/Tasks/ByUserType", {
            params : {
                id: props.id,
                type: props.type
            }
        }).then(response => {
            setTasks(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [props.type, props.updated]);

    useEffect(() => {
        if (props.selected){
            props.handleSetSelected(tasks.find(t => t.id === props.selected.id));
        }
    }, [tasks]);
    
    return (
        <>
            {tasks && <div className={"tasks-list-container"}>
                <TasksSection header={"High Priority"} tasks={tasks.filter(t => t.priority == 0)} selected={props.selected} handleSetSelected={props.handleSetSelected} handleUpdate={props.handleUpdate} config={props.config}/>
                <TasksSection header={"Medium Priority"} tasks={tasks.filter(t => t.priority == 1)} selected={props.selected} handleSetSelected={props.handleSetSelected} handleUpdate={props.handleUpdate} config={props.config}/>
                <TasksSection header={"Low Priority"} tasks={tasks.filter(t => t.priority == 2)} selected={props.selected} handleSetSelected={props.handleSetSelected} handleUpdate={props.handleUpdate} config={props.config}/>
            </div>}
        </>
    )
}

export default TasksList