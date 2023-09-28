import "./Notes.css";

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Note from "./Note";
import {AddBox} from "@mui/icons-material";
import NewNote from "../tags/NewNote";
import NoteDetails from "./NoteDetails";

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
    
    const [selectedNote, setSelectedNote] = useState(null);
    
    const[isOpenNote, setIsOpenNote] = useState(false);
    
    const handleOpenNote = (value) => {
        setSelectedNote(value);
        setIsOpenNote(true);
    }
    
    const handleCloseNote = () => {
        setSelectedNote(null);
        setIsOpenNote(false);
    }
    
    return (
        <div className={"notes-container"}>
            {category && <div className={"notes-header"}>
                <h2 className={"notes-category-title"}>Notes - {category.description}</h2>
                <AddBox className={"notes-add-btn"} fontSize={"large"} color={"secondary"} onClick={handleOpenNewNote.bind(this, true)}/>
            </div>}
            <div className={"notes"} style={{filter: selectedNote != null ? "blur(3px)" : ""}}>
                {notes && notes.map(note => 
                    <Note key={note.id} note={note} onClick={handleOpenNote}/>
                )}
            </div>
            {isCreatingNewNote && <NewNote userId={props.id} categoryId={category.id} handleOpenNewNote={handleOpenNewNote} handleSetUpdated={handleSetUpdated}/>}
            {isOpenNote && <NoteDetails id={props.id} note={selectedNote} handleCloseNote={handleCloseNote} />}
        </div>
    )
}

export default Notes