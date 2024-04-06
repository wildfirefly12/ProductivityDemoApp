import "./Lists.css";

import React, {useEffect, useState} from "react";
import {AddBox} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import axios from "axios";
import List from "./List";
import {Typography} from "@mui/material";

const Lists = (props) => {
    const { id } = useParams();

    const [updated, setUpdated] = useState(0);

    const handleUpdate = () => {
        setUpdated(updated + 1);
    }

    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get("api/ListCategories/ById", {
            params: {
                id: id
            }
        }).then(response => {
            setCategory(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [id]);
    
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get("api/Lists/ByCategory", {
            params: id
        }).then(response => {
                setLists(response.data);
            }).catch(error => {
                console.log(error);
        })
    }, [category]);

    const [newListOpen, setNewListOpen] = useState(false);

    const handleOpenNewList = () => {
        setNewListOpen(true);
    }

    const handleCloseNewList = ()=> {
        setNewListOpen(false);
        handleUpdate()
    }

    const [selected, setSelected] = useState(null);

    const handleSetSelected = (task) => {
        setSelected(task);
    }

    const titleStyle = {
        fontFamily: "Passion One, sans-serif",
        fontSize: "32px"
    }
    
    return (
        <div className={"lists-container"}>
            <div className={"lists-header"}>
                {category && <Typography sx={titleStyle}>{category.description}</Typography>}
                <AddBox className={"lists-add-btn"} fontSize={"large"} color={"secondary"} onClick={handleOpenNewList}/>
            </div>
            <div className={"lists-sections-container"}>
                {lists.map(list =>
                    <List key={list.id} id={list.id} handleUpdate={props.handleUpdate} config={props.config} />
                )}
            </div>
        </div>
    )
}

export default Lists