import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import noteContext from "../Context/notes/NoteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="d-flex flex-row mb-3">
            <div className="mx-3">
              <h3>Your Notes</h3>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
            >
              Click to add a Note
            </button>
          </div>

          <Addnote />

          {notes.length !== 0 ? (
            notes.map((note) => {
              return <Noteitem key={note._id} note={note} />;
            })
          ) : (
            <>
              <br />
              <br />
              <br />
              <br />
              <div className="text-center d-flex justify-content-center">
                <div
                  className="card text-bg-info text-dark mb-3 my-2"
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card-header">
                    {" "}
                    <h4> Welcome</h4>
                  </div>
                  <div className="card-body">
                    <p className="card-text">Add your first note to view it.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
