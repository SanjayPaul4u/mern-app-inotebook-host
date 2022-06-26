import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


const Notes = (props) => {
  const navigate = useNavigate();

  const context = useContext(noteContext);
  const { notes, getAllNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){//📌📌📌
      getAllNote();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  // for getting each note's id
  const [editNoteId, setEditNoteId] = useState(null);
  // work for edit note
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""});
  



  // use ref
  const ref = useRef(null);
  const refClose = useRef(null);
  // update note
  const updateNote = (currentNote) => {
    ref.current.click();
    setEditNoteId(currentNote._id)
    setNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  };


  // handle click
  const handleClick=(e)=>{
    e.preventDefault();
    editNote(editNoteId, note.etitle, note.edescription, note.etag);
    ref.current.click();
    props.showAlert("Note updated successfully.", "success");
  }
  // on change
  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote showAlert= {props.showAlert}/>
      {/* modal start */}
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit your note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* from started */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitleId"
                    placeholder="Enter your title"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescriptionId"
                    rows="3"
                    name="edescription"
                    placeholder="Enter your description"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={3}
                    required

                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etagId"
                    placeholder="Enter your title"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}

                  />
                </div>
              </form>
              {/* from end*/}
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled ={note.etitle.length<3 || note.edescription.length<5 || note.etag.length<1 } onClick={handleClick} className="btn btn-primary">
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
      <div className="container pb-5">
        <h1>Your notes</h1>
        <div className="row">
          {notes.length ===0 && <p>No notes to Display 😔 go above and add note 👆</p>}
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert= {props.showAlert} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
