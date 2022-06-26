import React, {useState} from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
  // const port = process.env.PORT || 5555
  // const host = `http://localhost:${port}` ;
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);


    // get all note 🔴
    const getAllNote = async()=>{
      // Api call
      const response = await fetch(`https://inotebbook.herokuapp.com/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      setNotes(json);

    }

    // add a note 🔴
      const addNote = async(title, description, tag)=>{
        // Api call
        const response = await fetch(`https://inotebbook.herokuapp.com/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({title, description, tag}) 
        });
        const json = await response.json();
        setNotes(notes.concat(json));
        if(setNotes(notes.concat(json))){
          
        }
      }
    // delete a note 🔴
      const deleteNote = async(id)=>{
         // Api call
         const response = await fetch(`https://inotebbook.herokuapp.com/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          }
        });
        await response.json();
        

        // delete logic
        const newNotes = notes.filter((element)=>{
          return element._id!==id;
        })
        setNotes(newNotes);
      }

    // edit(update) a note 🔴 TODO-> NOT FULFILL EDITNOTE
    const editNote = async(id, title, description, tag)=>{
        // Api call
        const response = await fetch(`https://inotebbook.herokuapp.com/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({title, description, tag}) 
        });
        await response.json();
      
        // logic to edit in client

      // let newArr = []; // newArr.push(element);
      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let i = 0; i <newNotes.length; i++) {
        const element = newNotes[i];

        if(element._id===id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;