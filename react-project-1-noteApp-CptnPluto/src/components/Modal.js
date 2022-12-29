import Note from "./Note";
import Form from "./Form";
import { useState } from "react";

const Modal = ({ content, onClose, onDelete, onClick, onAdd, onRefresh }) => {
    const [editing, setEditing] = useState(false);
    console.log("rendering modal");
    return (
        <div className="modal" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => {
                    setEditing(true);
                    e.stopPropagation();
                }}
            >
                {editing ? (
                    <Form
                        onAdd={(content) => {
                            onAdd(content);
                            onClose();
                        }}
                        note={content}
                        onClose={onClose}
                    />
                ) : (
                    <Note
                        note={content}
                        onDelete={onDelete}
                        onSelect={onClick}
                        onRefresh={onRefresh}
                    />
                )}
            </div>
        </div>
    );
};

// This seems like how they wanted us to do it, but I prefer my way.
// I'm keeping this in just in case I need to switch it.

// return (
// <div className="modal" onClick={onClose}>
//     <div
//         className="modal-content"
//         onClick={(e) => e.stopPropagation()}
//     >
//         <Form
//                 onAdd={(content) => {
//                     onAdd(content);
//                     onClose();
//                 }}
//                 note={content}
//             />
//     </div>
// </div>
// )

export default Modal;
