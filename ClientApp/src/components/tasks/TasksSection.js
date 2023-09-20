import "./TasksSection.css";

import React, {useState} from "react";
import TaskLineItem from "./TaskLineItem";

const TasksSection = (props) => {
    
    return (
        <div className={"tasks-section-container"}>
            <p className={"tasks-section-header"}>{props.header}</p>
            {props.tasks.map((task, i) =>
                <TaskLineItem key={i} task={task} selected={props.selected === task} handleSetSelected={props.handleSetSelected} />
            )}
        </div>
    )
}

export default TasksSection