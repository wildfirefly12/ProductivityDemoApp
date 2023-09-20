import "./TasksSection.css";

import React, {useState} from "react";
import TaskLineItem from "./TaskLineItem";

const TasksSection = (props) => {
    
    return (
        <div className={"tasks-section-container"}>
            <p className={"tasks-section-header"}>{props.header}</p>
            {props.tasks.map(task =>
                <TaskLineItem task={task} />
            )}
        </div>
    )
}

export default TasksSection