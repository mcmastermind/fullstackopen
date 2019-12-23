import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Button from './components/Button'
import Form from './components/Form'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true) 
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    },[])

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update( id, changedNote )
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const rows = () => notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        if( newNote.length === 0 ) {
            alert('Enter a note.')
            return
        }
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <Button text={showAll ? 'Show Important' : 'Show All'} onClick={() => setShowAll(!showAll)}/>
            <ul>
                {rows()}
            </ul>
            <Form addNote={addNote} newNote={newNote} handleNoteChange={handleNoteChange}/>
            <Footer />
        </div>
    )
}

export default App