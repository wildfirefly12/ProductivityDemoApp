import "./Tag.css";

import React from "react";

const Tag = (props) => {
    
    
    return (
        <div className={"tag-container"} style={{backgroundColor: props.tag.color}}>
            <p>{props.tag.description}</p>
        </div>
    )
}

export default Tag