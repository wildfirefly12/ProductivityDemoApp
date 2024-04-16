import "./Lists.css";

import React, {useEffect, useState} from "react";
import {AddBox} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import axios from "axios";
import List from "./List";
import {Typography} from "@mui/material";
import NewList from "./NewList";

const Lists = (props) => {
    const {id} = useParams();

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
        console.log("hit")
        axios.get("api/Lists/ByCategory", {
            params: {
                id: id
            }
        }).then(response => {
            setLists(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const [isNewListOpen, setIsNewListOpen] = useState(false);

    const openNewList = () => {
        setIsNewListOpen(true);
    }

    const closeNewList = () => {
        setIsNewListOpen(false);
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
        <div className={"lists-page-container"}>
            <div className={"lists-header"}>
                {category && <Typography sx={titleStyle}>{category.description}</Typography>}
                <AddBox className={"lists-add-btn"} fontSize={"large"} color={"secondary"} onClick={openNewList}/>
            </div>
            <div className={"lists-details-container"}>
                <div className={"lists-container"}>
                    {lists.map(list =>
                        <div key={list.id}
                             style={{backgroundColor: selected?.id === list.id ? "#FFCCAA" : "transparent"}}
                             className={"lists-list-container"}>
                            <Typography onClick={handleSetSelected.bind(this, list)}>{list.title}</Typography>
                        </div>
                    )}
                </div>
                <List list={selected}/>
            </div>
            {isNewListOpen ? <NewList catId={category.id} userId={category.userId} config={props.config}
                                      closeNewList={closeNewList} handleSetUpdated={handleUpdate}/> : ""}
        </div>
    )
}

export default Lists