import "./ListLineItem.css";

import React, {useState} from "react";
import Tag from "../tags/Tag";
import {Checkbox, Typography} from "@mui/material";
import axios from "axios";
import {ListItemDto} from "../../dtos/ListItemDto";

const ListLineItem = (props) => {
    
    const [tags, setTags] = useState([])

    const selectedBackground = props.selected ? "#FFCCAA" : "transparent";
    
    const handleMarkChecked = (event) => {
        const listItem = new ListItemDto(props.item.id, props.item.description, event.target.checked, props.item.listId);
        
        axios.post("api/ListItems/Edit", listItem, props.config)
            .then(response => {
                console.log(response)
                props.handleUpdate()
            }).catch(error => {
                console.log(error)
        })
    }
    
    return (
        <div className={"list-line-item-container"} style={{backgroundColor: selectedBackground}} >
            <Checkbox checked={props.item.isChecked} sx={{padding: 0, margin: 0}} onChange={handleMarkChecked}/>
            <Typography>{props.item.description}</Typography>
        </div>
    )
}

export default ListLineItem