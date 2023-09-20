import "./TasksList.css";

import React, {useEffect, useState} from "react";
import TasksSection from "./TasksSection";
import axios from "axios";

const TasksList = (props) => {
    
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("api/Tasks/ByUser", {
            params : {
                id: props.id
            }
        }).then(response => {
            setTasks(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const [selected, setSelected] = useState(null);

    const handleSetSelected = (task) => {
        setSelected(task);
    }
    
    return (
        <div className={"tasks-list-container"}>
            <TasksSection header={"High Priority"} tasks={tasks.filter(t => t.priority == 0 && !t.isRecurring)}  selected={selected} handleSetSelected={handleSetSelected}/>
            <TasksSection header={"Med Priority"} tasks={tasks.filter(t => t.priority == 1 && !t.isRecurring)} selected={selected} handleSetSelected={handleSetSelected}/>
            <TasksSection header={"Low Priority"} tasks={tasks.filter(t => t.priority == 2 && !t.isRecurring)} selected={selected} handleSetSelected={handleSetSelected}/>
            <TasksSection header={"Recurring"} tasks={tasks.filter(t => t.isRecurring)}/>
        </div>
    )
}

export default TasksList