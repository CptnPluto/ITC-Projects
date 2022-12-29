import { BiTrash, BiRefresh } from "react-icons/bi";

const Note = ({ note, onDelete, onRefresh, onSelect }) => {
    return (
        <div className={note.archived ? "archived-note" : "note"}>
            <div className="note-header">
                <div className="row">
                    <div className="column">Created: {note.createdDate}</div>
                    <div className="column">
                        <BiTrash
                            className="delete-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => onDelete(note.id)}
                        />
                    </div>
                    {note.archived && (
                        <div className="column">
                            <BiRefresh
                                className="delete-icon"
                                style={{ cursor: "pointer" }}
                                onClick={() => onRefresh(note.id)}
                            />
                        </div>
                    )}
                </div>
                {note.editedDate && (
                    <div className="row">
                        <div className="column">Edited: {note.editedDate}</div>
                    </div>
                )}
            </div>

            <div className="note-body" onClick={() => onSelect(note)}>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
            </div>
        </div>
    );
};

export default Note;
