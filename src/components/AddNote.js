import React,{useState} from 'react'
import {useContext} from 'react';
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const {showAlert} = props;
    const context = useContext(noteContext);
  const {addNote} = context;

  

  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({title: "", description: "", tag: ""});
    showAlert("Note added successfully", 'success');
  }

  const onChange=(e)=>{
    
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div className="container mb-5 ">
        <h1>Add note</h1>
        <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={note.title}
            type="text"
            className="form-control"
            id="titleId"
            placeholder="Enter your title"
            name='title'
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={note.description}
            className="form-control"
            id="descriptionId"
            rows="3"
            name='description'
            placeholder='Enter your description'
            onChange={onChange}
            minLength={5}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={note.tag}
            type="text"
            className="form-control"
            id="tagId"
            placeholder="Enter your title"
            name='tag'
            onChange={onChange}
          />
        </div>
        <button disabled ={note.title.length<3 || note.description.length<5 || note.tag.length<1 } onClick={handleClick} type="Add note" className="btn btn-outline-dark">Submit</button>
        </form>
      </div>
  )
}

export default AddNote