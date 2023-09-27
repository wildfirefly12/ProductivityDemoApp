import "./Notes.css";

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Note from "./Note";
import {AddBox} from "@mui/icons-material";
import NewNote from "../tags/NewNote";

const Notes = (props) => {
    const [updated, setUpdated] = useState(0);
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }

    const { id } = useParams();
    
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get("api/Categories/ById", {
            params: {
                id: id
            }
        }).then(response => {
            setCategory(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, []);
    
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("api/Notes/ByCategory", {
            params: {
                id: id
            }
        }).then(response => {
            setNotes(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [updated]);
    
    const[isCreatingNewNote, setIsCreatingNewNote] = useState(false);
    
    const handleOpenNewNote = (value) => {
        setIsCreatingNewNote(value);
    }
    
    return (
        <div className={"notes-container"}>
            {category && <div className={"notes-header"}>
                <h2 className={"notes-category-title"}>Notes - {category.description}</h2>
                <AddBox className={"notes-add-btn"} fontSize={"large"} color={"secondary"} onClick={handleOpenNewNote.bind(this, true)}/>
            </div>}
            <div className={"notes"}>
                {notes && notes.map(note => 
                    <Note key={note.id} note={note} />
                )}
            </div>
            {isCreatingNewNote && <NewNote userId={props.id} categoryId={category.id} handleOpenNewNote={handleOpenNewNote} handleSetUpdated={handleSetUpdated}/>}
        </div>
    )
}

export default Notes