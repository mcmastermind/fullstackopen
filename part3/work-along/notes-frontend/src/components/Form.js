import React from 'react'

const Form = ({ addNote, newNote, handleNoteChange }) => {

    return (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">Save</button>
        </form>
    )
}

export default Form