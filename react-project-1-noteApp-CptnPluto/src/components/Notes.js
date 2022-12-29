import Note from "./Note";

const Notes = ({ notes, onDelete, onSelect }) => {
    return (
        <div className="notes-grid">
            {notes &&
                notes.length > 0 &&
                notes.map((note) => (
                        <Note
                        key={note.id}
                        note={note}
                        onDelete={onDelete}
                        onSelect={onSelect}
                    />
                ))}
        </div> 
    );
};

export default Notes;
