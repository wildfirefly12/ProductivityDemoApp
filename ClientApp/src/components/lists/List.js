import "./List.css";

import React, {useEffect, useState} from "react";
import ListLineItem from "./ListLineItem";
import axios from "axios";
import {Typography} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import NewListItem from "./NewListItem";

const List = (props) => {

    const [updated, setUpdated] = useState(0);

    const handleSetUpdate = () => {
        setUpdated(updated + 1);
    }
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        if(props.list){
            axios.get("api/ListItems/ByList", {
                params: {
                    id: props.list.id
                }
            })
                .then(response => {
                    setItems(response.data);
                }).catch(error => {
                console.log(error);
            })
        }
    }, [props.list, updated]);
    
    const [newItemIsOpen, setNewItemIsOpen] = useState(false);
    
    const openNewItem = () => {
        setNewItemIsOpen(true);
    }
    
    const closeNewItem = () => {
        setNewItemIsOpen(false);
    }

    return (
        <div className={"list-container"}>
            <div className={"list-header-container"}>
                <Typography sx={{fontWeight: "bold", fontSize: "22px", fontFamily: "Pacific-One, sans-serif"}}>{props.list?.title}</Typography>
                <AddBox className={"lists-add-btn"} fontSize={"large"} color={"secondary"} onClick={openNewItem}/>
            </div>
            {items.map(item=>
                <ListLineItem key={item.id} item={item} handleUpdate={handleSetUpdate} config={props.config} />
            )}
            {newItemIsOpen ? <NewListItem id={props.list.id} handleSetUpdate={handleSetUpdate} /> : ""}
        </div>
    )
}

export default List