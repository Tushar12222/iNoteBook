import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //Get all notes
  const getNotes = async () => {
    //TODO api call
    try {
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      
      setNotes(json);
      return json.body;
    } catch (error) {
      return error;
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    
    if(title.length < 3){
      return ({"error": "Title should contain atleast 3 characters."});
    }
    if(description.length < 5){
      return ({"error":"Description should be atleast 5 characters."})
    }
    //API call
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },

        body: JSON.stringify({ title, description, tag }),
      });
      
      
      getNotes();
      const json = response.json();
      console.log(json.body)
      return json.body;
    } catch (error) {
      return error;
    }

    
  };

  //Delete a note
  const deleteNote = async (id) => {
    try {
      //TODO api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      
      getNotes();
      const json = await response.json();
      return json.body;
    } catch (error) {
      return error;
    }

    /* const json = await response.json();
        console.log(json) */
    //trying
  };

  
  //Edit a note

  const editNote = async (id, title, description, tag) => {
    
    if(title.length < 3){
      return ({"error": "Title should contain atleast 3 characters."});
    }
    if(description.length < 5){
      return ({"error":"Description should be atleast 5 characters."})
    }
    try {
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },

        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);
      getNotes();
      return json.body;
    } catch (error) {
      return error;
    }

    
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
