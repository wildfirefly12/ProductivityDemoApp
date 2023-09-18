import  "./NavTags.css";

import React, {useState} from "react";
import {TaskOutlined} from "@mui/icons-material";
import Tag from "../tags/Tag";

const NavTags = () => {
    
    const [tags, setTags] = useState([]);
    
    return (
        <div>
            <div className={"nav-tags-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}} />
                <p className={"navbar-tags-title-text"}>Tags</p>
            </div>
            <div className={"nav-tags-container"}>
                {tags.map(tag => 
                    <Tag tag={tag}/>
                )}
            </div>
        </div>
    )
}

export default NavTags