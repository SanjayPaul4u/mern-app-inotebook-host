import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note, updateNote} =props;

  return (
    <div className="col-10 col-md-6 col-xxl-4 gy-4 gx-4">
          <div className="card">
          <div className="card-body">
            <div style={{display: 'flex', justifyContent: "flex-end", position: "absolute", right: "0" }}>
              <i onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", 'success')}} className="fa-solid fa-trash-can mx-1"></i><i  onClick={()=>{updateNote(note)}} className="fa-solid fa-pen-to-square mx-1"></i>
              </div>
              <h5>{note.title} <span className="card-title badge bg-secondary">{note.tag}</span></h5>
            <p className="card-text">{note.description}</p>
            
          </div>
          </div>
        </div>
  )
}

export default NoteItem