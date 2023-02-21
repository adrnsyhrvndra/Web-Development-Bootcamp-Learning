import React, { useState } from "react";

import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {

  const[isExpanded,setExpanded] = useState(false);

  const [note,SetNote] = useState({

    title:"",
    content:""

  });

  function handleChange(event) {
    
    const {name,value} = event.target;

    SetNote(prevNote => {

      return{
        ...prevNote,
        [name]: value
      };

    });

  }

  function submitNote(event) {
    
    props.onAdd(note);

    SetNote({
      
      title:"",
      content:""
      
    });

    event.preventDefault();

  }

  function expand() {
    
    setExpanded(true);

  }

  return (

    <div>

      <form className="create-note">

        {isExpanded ? <input onChange={handleChange} name="title" value={note.title} placeholder="Title" /> : null}

        <textarea 
          onChange={handleChange} 
          name="content"
          onClick={expand} 
          value={note.content} 
          placeholder="Take a note..." 
          rows={isExpanded ? 3 : 1} 
        />

        <Zoom in={isExpanded}>

          <Fab onClick={submitNote}> 
          
            <AddIcon/>

          </Fab>

        </Zoom>

      </form>

    </div>

  );

}

export default CreateArea;
