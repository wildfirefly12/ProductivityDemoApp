import "./TasksList.css";

import React, {useState} from "react";
import TasksSection from "./TasksSection";

const TasksList = (props) => {
    
    const [tasks, setTasks] = useState([]);
    
    return (
        <div className={"tasks-list-container"}>
            <TasksSection header={"High Priority"} tasks={tasks.filter(t => t.priority == 0 && !t.isRecurring)}/>
            <TasksSection header={"Med Priority"} tasks={tasks.filter(t => t.priority == 1 && !t.isRecurring)}/>
            <TasksSection header={"Low Priority"} tasks={tasks.filter(t => t.priority == 2 && !t.isRecurring)}/>
            <TasksSection header={"Recurring"} tasks={tasks.filter(t => t.isRecurring)}/>
        </div>
    )
}

export default TasksList