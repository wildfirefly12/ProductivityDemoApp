import "./NavNotes.css";

import React, {useEffect, useState} from "react";
import {TaskOutlined} from "@mui/icons-material";
import {Button, Divider} from "@mui/material";
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
                    <Link to={`/notes/${category.id}`} style={{textDecoration: "none"}}>
                        <NavCategory category={category} />
                    </Link>
                )}
                <div className={"nav-notes-new-category-container"}>
                    <Button
                        sx={{
                            backgroundColor: "#b3b3b3",
                            padding: "2px 2px",
                            color: "black",
                            fontFamily: "Roboto Condensed, sans-serif",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            fontWeight: 400,
                            height: "20px",
                            maxWidth: "20px !important",
                            minWidth: "20px !important",
                            margin: "6px"
                        }}
                        onClick={handleSetIsCreating.bind(this, true)}
                    >+</Button>
                    <p className={"nav-notes-new-category-text"} onClick={handleSetIsCreating.bind(this, true)}>New Category</p>
                </div>
            </div>
            {isCreating && <NewNotesCategory id={props.id} handleSetIsCreating={handleSetIsCreating} handleUpdate={handleSetUpdated}/>}
        </div>
    )
}

export default NavNotes