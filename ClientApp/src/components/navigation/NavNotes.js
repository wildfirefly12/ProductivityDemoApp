import "./NavNotes.css";

import React, {useEffect, useState} from "react";
import {AddBox, TaskOutlined} from "@mui/icons-material";
import {Button, Divider, Typography} from "@mui/material";
import axios from "axios";
import NavCategory from "./NavCategory";
import {Link} from "react-router-dom";
import NewNotesCategory from "../notes/NewNotesCategory";

const NavNotes = (props) => {

    const [updated, setUpdated] = useState(0);
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }
    
    const [isCreating, setIsCreating] = useState(false);

    const handleSetIsCreating = (value) => {
        setIsCreating(value);
    }

    const [isEditing, setIsEditing] = useState(false);
    
    const handleSetIsEditing = (value) => {
        setIsEditing(value);
    }
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("api/NoteCategories/ByUser", {
            params: {
                id: props.id
            }
        }).then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [props.updated, updated]);
    
    return (
        <div>
            <div className={"nav-notes-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}} />
                <p className={"navbar-notes-title-text"}>Notes</p>
            </div>
            <Divider color={"darkgray"} sx={{marginBottom: "5px"}}/>
            <div className={"nav-category-categories"}>
                {categories.map(category =>
                    <Link key={category.id} to={`/notes/${category.id}`} style={{textDecoration: "none"}}>
                        <NavCategory category={category} />
                    </Link>
                )}
                <div className={"nav-notes-new-category-container"}>
                    <AddBox
                        sx={{
                            Color: "#b3b3b3",
                            margin: "6px"
                        }}
                        onClick={handleSetIsCreating.bind(this, true)}
                    />
                    <Typography sx={{fontFamily: "Roboto Condensed, sans-serif", fontSize: "14px", fontStyle: "italic", margin: 0}} onClick={handleSetIsCreating.bind(this, true)}>New Category</Typography>
                </div>
            </div>
            {isCreating && <NewNotesCategory id={props.id} handleSetIsCreating={handleSetIsCreating} handleUpdate={handleSetUpdated}/>}
        </div>
    )
}

export default NavNotes