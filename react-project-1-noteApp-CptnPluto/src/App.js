import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Notes from "./components/Notes";
import ArchivedNotes from "./components/ArchivedNotes";
import Modal from "./components/Modal";
import Button from "./components/Button";
import "./index.css";

function App() {
    const [show, setShow] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [editing, setEditing] = useState(false);
    const [modal, setModal] = useState({});
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);

    // Fetch notes from local storage
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("NOTES_LIST"));
        savedNotes !== null && setNotes(savedNotes);
    }, []);

    useEffect(() => {
        const savedArchivedNotes = JSON.parse(
            localStorage.getItem("ARCHIVED_NOTES_LIST")
        );
        savedArchivedNotes !== null && setArchivedNotes(savedArchivedNotes);
    }, []);

    // Store notes in local storage
    useEffect(() => {
        localStorage.setItem("NOTES_LIST", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        localStorage.setItem(
            "ARCHIVED_NOTES_LIST",
            JSON.stringify(archivedNotes)
        );
    }, [archivedNotes]);

    // Add new or editted note
    const addNote = (note) => {
        const id = note.id || nanoid();
        const newNote = { ...note, id };
        let curI = 0;

        if (note.id && !note.archived) {
            // If editing an existing, unarchived note
            // First check if the note has been edited
            curI = notes.findIndex((n) => n.id === note.id);
            if (notes[curI].text !== newNote.text) {
                newNote.editedDate = createDate();
            }
            notes[curI] = newNote;
            setNotes([...notes]);
        } else if (note.id && note.archived) {
            // If editing an existing, archived note
            // First check if the note has been edited
            curI = archivedNotes.findIndex((n) => n.id === note.id);
            if (notes[curI].text !== newNote.text) {
                newNote.editedDate = createDate();
            }
            archivedNotes[curI] = newNote;
            newNote.archived = true;
            setArchivedNotes([...archivedNotes]);
        } else {
            // If adding a new note
            setNotes((prevNotes) => [...prevNotes, newNote]);
        }
    };

    // Create date object
    const createDate = () => {
        const entryDate = new Date();
        const date =
            1 +
            entryDate.getMonth() +
            "/" +
            entryDate.getDate() +
            " " +
            entryDate.getHours() +
            ":" +
            entryDate.getMinutes() +
            ":" +
            entryDate.getSeconds();
        return date;
    };

    // Archive Note
    const archiveNote = (id) => {
        const toArchive = notes.find((n) => n.id === id);
        toArchive.archived = true;
        setArchivedNotes((prevArchivedNotes) => [
            ...prevArchivedNotes,
            toArchive,
        ]);
        setNotes(notes.filter((note) => note.id !== id));
    };

    // Unarchive Note
    const unarchiveNote = (id) => {
        const toUnarchive = archivedNotes.find((n) => n.id === id);
        toUnarchive.archived = false;
        setNotes((prevNotes) => [...prevNotes, toUnarchive]);
        setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
        setShow(false);
    };

    // Delete Note
    const deleteNote = (id) => {
        const text = "Are you sure you want to delete your note?";
        if (window.confirm(text)) {
            setShow(false);
            setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
        } else {
            return;
        }
    };

    // Build modal
    const buildModal = (note) => {
        console.log("buildingModal:", note);
        setModal(note);
        setShow(true);
    };

    // Show archived notes
    const toggleArchiveNotes = () => {
        setShowArchive(!showArchive);
    };

    // Set editing state
    const toggleEditing = () => {
        setEditing(!editing);
        console.log("editing:", editing);
    };

    // Close modal
    const close = () => {
        setShow(false);
    };

    return (
        <>
            <Form onAdd={addNote} editing={editing} onClose={close} />
            <Notes notes={notes} onDelete={archiveNote} onSelect={buildModal} />
            <Button
                color="archive-button"
                text="Show Archived Notes"
                onClick={toggleArchiveNotes}
            />
            {showArchive && (
                <ArchivedNotes
                    notes={archivedNotes}
                    onDelete={deleteNote}
                    onSelect={buildModal}
                    onRefresh={unarchiveNote}
                />
            )}
            {show && (
                <Modal
                    content={modal}
                    editing={editing}
                    onClose={close}
                    onDelete={deleteNote}
                    onClick={toggleEditing}
                    onAdd={addNote}
                    onRefresh={unarchiveNote}
                />
            )}
        </>
    );
}

export default App;
