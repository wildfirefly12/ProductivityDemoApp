import "./List.css";

import React, {useEffect, useState} from "react";
import ListLineItem from "./ListLineItem";
import axios from "axios";
import {Typography} from "@mui/material";

const List = (props) => {
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("api/ListItems/ByList", props.id, props.config)
            .then(response => {
                setItems(response.data);
            }).catch(error => {
                console.log(error);
        })
    }, []);

    return (
        <div className={"list-section-container"}>
            <Typography sx={{
                
            }}>{props.header}</Typography>
            {items.map(item=>
                <ListLineItem key={item.id} item={item} handleUpdate={props.handleUpdate} config={props.config} />
            )}
        </div>
    )
}

export default List