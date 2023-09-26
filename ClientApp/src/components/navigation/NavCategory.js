import "./NavCategory.css";

import React from "react";

const NavCategory = (props) => {
    
    
    return (
        <div className={"nav-category-container"}>
            <div style={{backgroundColor: props.category.color}} className={"nav-category-color"}></div>
            <p className={"nav-category-text"}>{props.category.description}</p>
        </div>
    )
}

export default NavCategory