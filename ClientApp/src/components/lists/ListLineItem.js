import "./ListLineItem.css";

import React, {useState} from "react";
import Tag from "../tags/Tag";
import {Checkbox} from "@mui/material";
import axios from "axios";
import {ListItemDto} from "../../dtos/ListItemDto";

const ListLineItem = (props) => {
    
    const [tags, setTags] = useState([])

    const selectedBackground = props.selected ? "#FFCCAA" : "transparent";
    
    const [isChecked, setIsChecked] = useState(props.list.isChecked || false);
    
    const handleMarkChecked = (event) => {
        setIsChecked(!isChecked);
        
        const listItem = new ListItemDto(props.item.id, props.item.description, isChecked, props.item.listId);
        
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
            <Checkbox checked={isChecked} sx={{padding: 0, margin: 0}} onChange={handleMarkChecked}/>
            <p className={"list-line-item-title"} onClick={props.handleSetSelected.bind(this, props.list)}>{props.list.title}</p>
            {tags.map((tag, i) => 
                <Tag key={i} className={"list-tag"} tag={tag}/>
            )}
        </div>
    )
}

export default ListLineItem