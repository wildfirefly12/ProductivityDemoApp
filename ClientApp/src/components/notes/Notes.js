import "./Notes.css";

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Note from "./Note";
import {AddBox, Delete, Edit} from "@mui/icons-material";
import NewNote from "./NewNote";
import NoteDetails from "./NoteDetails";
import EditNotesCategory from "./EditNotesCategory";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const Notes = (props) => {
    const [updated, setUpdated] = useState(0);
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }

    const {id} = useParams();

    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get("api/NoteCategories/ById", {
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

    const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);

    const handleOpenNewNote = (value) => {
        setIsCreatingNewNote(value);
    }

    const [selectedNote, setSelectedNote] = useState(null);

    const [isOpenNote, setIsOpenNote] = useState(false);

    const handleOpenNote = (value) => {
        setSelectedNote(value);
        setIsOpenNote(true);
    }

    const handleCloseNote = () => {
        setSelectedNote(null);
        setIsOpenNote(false);
    }

    const [isCatEditorOpen, setIsCatEditorOpen] = useState(false);

    const openCatEditor = () => {
        setIsCatEditorOpen(true);
    }

    const closeCatEditor = () => {
        setIsCatEditorOpen(false);
    }

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const openDeleteConfirmation = () => {
        setIsDeleteConfirmOpen(true);
    }

    const closeDeleteConfirmation = () => {
        setIsDeleteConfirmOpen(false);
    }

    const [message, setMessage] = useState("");
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const openMessage = () => {
        setIsMessageOpen(true);
    }

    const closeMessage = () => {
        setIsMessageOpen(false);
    }

    const deleteCategory = () => {
        axios.post("api/NoteCategories/Delete", category.id, props.config)
            .then(response => {
                console.log(response);
                closeDeleteConfirmation();
            }).catch(error => {
                console.log(error);
                closeDeleteConfirmation();
                setMessage(error.response.data);
                openMessage();
        })
    }

    const titleStyle = {
        fontFamily: "Passion One, sans-serif",
        fontSize: "32px"
    }

    return (
        <>
            <div className={"notes-container"}>
                {category && <div className={"notes-header"}>
                    <div className={"notes-category-title-container"}>
                        <div style={{backgroundColor: category.color}} className={"notes-category-color"}/>
                        <Typography sx={titleStyle}>{category.description}</Typography>
                        <Edit sx={{margin: "0 5px"}} onClick={openCatEditor}/>
                        <Delete sx={{margin: "0 5px"}} onClick={openDeleteConfirmation}/>
                    </div>
                    <AddBox className={"notes-add-btn"} fontSize={"large"} color={"secondary"}
                            onClick={handleOpenNewNote.bind(this, true)}/>
                </div>}
                <div className={"notes"} style={{filter: selectedNote != null ? "blur(3px)" : ""}}>
                    {notes && notes.map(note =>
                        <Note key={note.id} note={note} onClick={handleOpenNote}/>
                    )}
                </div>
                {isCreatingNewNote &&
                    <NewNote userId={props.id} categoryId={category.id} handleOpenNewNote={handleOpenNewNote}
                             handleSetUpdated={handleSetUpdated}/>}
                {isOpenNote && <NoteDetails id={props.id} note={selectedNote} handleCloseNote={handleCloseNote}/>}
                {isCatEditorOpen && <EditNotesCategory category={category} closeEditor={closeCatEditor}
                                                       handleSetUpdated={handleSetUpdated}/>}
            </div>

            <Dialog open={isDeleteConfirmOpen} close={closeDeleteConfirmation}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Do you want to delete this category. This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={closeDeleteConfirmation}>Cancel</Button>
                    <Button variant={"contained"} color={"warning"} onClick={deleteCategory}>Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isMessageOpen} close={closeMessage}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={closeMessage}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Notes