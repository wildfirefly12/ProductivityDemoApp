import  "./NavTags.css";

import React, {useEffect, useState} from "react";
import {TaskOutlined} from "@mui/icons-material";
import Tag from "../tags/Tag";
import axios from "axios";
import EditTag from "../tags/EditTag";

const NavTags = (props) => {
    
    const [updated, setUpdated] = useState(0);
    
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }
    
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get("api/Tags/ByUser", {
            params: {
                id: props.id
            }
        }).then(response => {
            setTags(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [updated]);
    
    const [isEditing, setIsEditing] = useState(false);
    
    const handleSetIsEditing = (value, t) => {
        handleSetTag(t);
        setIsEditing(value);
    }
    
    const [tag, setTag] = useState(null);
    
    const handleSetTag = (tag) => {
        setTag(tag);
    }
    
    return (
        <div>
            <div className={"nav-tags-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}} />
                <p className={"navbar-tags-title-text"}>Tags</p>
            </div>
            <div className={"nav-tags-container"}>
                {tags.map((t, i) =>
                    <Tag key={i} tag={t} handleSetIsEditing={handleSetIsEditing} />
                )}
            </div>
            {isEditing && <EditTag tag={tag} handleSetIsEditing={handleSetIsEditing} handleSetUpdated={handleSetUpdated} />}
        </div>
    )
}

export default NavTags