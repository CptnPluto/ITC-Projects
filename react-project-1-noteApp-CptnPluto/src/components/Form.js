import { useState, useRef } from "react";
import Button from "./Button.js";

const Form = ({ onAdd, note, onClose }) => {
    // Create state for the form
    const [text, setText] = useState(note ? note.text : "");
    const [title, setTitle] = useState(note ? note.title : "");
    const [editing, setEditing] = useState(false);

    // Create ref state for the text input
    const textRef = useRef(null);
    const titleRef = useRef(null);

    // Resize the field textarea as the user types
    const resizeField = (e, field) => {
        if (field.current) {
            field.current.style.height = "auto";
            field.current.style.height = `${e.target.scrollHeight}px`;
        }
    };

    // Clean up the form
    const clearForm = () => {
        setText("");
        setTitle("");
        setEditing(false);
        textRef.current.style.height = "auto";
        titleRef.current.style.height = "auto";
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

    // Add note - passes title + text up to App component,
    // Also passes id and date if editing.
    const addNote = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Please add a note");
            return;
        }

        const newNote = {
            title: title,
            text: text,
            editedDate: note ? createDate() : null,
            createdDate: note ? note.createdDate : createDate(),
            id: note ? note.id : null,
            archived: note ? note.archived : false,
        };
        onAdd(newNote);
        clearForm();
    };

    const closeForm = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Please add a note");
        }
        onClose();
    };

    return (
        <form className="form">
            <div className="form-header">
                <h2 className="header">{note ? "Edit Note" : "Add Note"}</h2>
            </div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="title"></label>
                    <textarea
                        className="edit-title"
                        ref={titleRef}
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            resizeField(e, titleRef);
                        }}
                        placeholder="Enter a title"
                        rows="1"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <textarea
                        className="edit-text"
                        ref={textRef}
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            resizeField(e, textRef);
                            setEditing(true);
                        }}
                        placeholder="Enter a note"
                        rows="1"
                    ></textarea>
                </div>
            </div>
            <div className="form-footer">
                <Button
                    color={note ? "blue" : "green"}
                    text={note ? "Save" : "Add"}
                    onClick={editing ? addNote : closeForm}
                />
            </div>
        </form>
    );
};

export default Form;
