import Note from "./Note";

const ArchivedNotes = ({ notes, onDelete, onSelect, onRefresh }) => {
    return (
        <>
            <div className="notes-grid">
                {notes &&
                    notes.length > 0 &&
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            onDelete={onDelete}
                            onSelect={() => onSelect(note)}
                            onRefresh={onRefresh}
                        />
                    ))}
            </div>
        </>
    );
};

export default ArchivedNotes;
