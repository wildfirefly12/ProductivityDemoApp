import "./NavLists.css";
import React, {useEffect, useState} from "react";
import {AddBox, Category, TaskOutlined} from "@mui/icons-material";
import {Button, Divider, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import NavCategory from "./NavCategory";
import axios from "axios";
import NewNotesCategory from "../notes/NewNotesCategory";
import NewListsCategory from "../lists/NewListsCategory";

const NavLists = (props) => {

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
        axios.get("api/ListCategories/ByUser", {
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
            <div className={"nav-lists-title"}>
                <TaskOutlined sx={{fontSize: "32px", verticalAlign: "center", alignSelf: "center"}}/>
                <p className={"navbar-lists-title-text"}>Lists</p>
            </div>
            <Divider color={"darkgray"} sx={{marginBottom: "5px"}}/>
            <div className={"nav-category-categories"}>
                {categories.map(category =>
                    <Link to={`/lists/${category.id}`} style={{textDecoration: "none"}}>
                        <NavCategory category={category}/>
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
                    <Typography sx={{
                        fontFamily: "Roboto Condensed, sans-serif",
                        fontSize: "14px",
                        fontStyle: "italic",
                        margin: 0
                    }} onClick={handleSetIsCreating.bind(this, true)}>New Category</Typography>
                </div>
            </div>
            {isCreating && <NewListsCategory id={props.id} handleSetIsCreating={handleSetIsCreating} handleUpdate={handleSetUpdated}/>}
        </div>
    )
}

export default NavLists;