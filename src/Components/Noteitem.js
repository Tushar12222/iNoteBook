import React, { useContext, useState } from "react";
import swal from "sweetalert";

import noteContext from "../Context/notes/NoteContext";
import EditNote from "./EditNote";

const Noteitem = (props) => {
  const { title, description, tag, date } = props.note;
  const [enterEdit, setEnterEdit] = useState(false);
  const [enterDel, setEnterDel] = useState(false);
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;

  const handleDelClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let res = await deleteNote(props.note._id);
        if (res !== undefined) {
          swal({
            title: "Invalid",
            text: res.error,
            icon: "warning",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Success",
            text: "Note has been deleted.",
            icon: "success",
            buttons: false
          });
        }
      } else {
        swal({
          title: "Your Note is safe!",
          
        });
        
      }
    });
  };
  return (
    <>
      <div className="card col-md-3 my-3 mx-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5> <br />
          <p className="card-text">
            <b>Tag:</b> {tag} <br /> <br />
            <b>Description:</b> <br /> {description}. <br /> <br />{" "}
            <b>Date added:</b> <br /> {new Date(date).toUTCString()}
          </p>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onMouseEnter={() => {
                setEnterEdit(true);
              }}
              onMouseLeave={() => {
                setEnterEdit(false);
              }}
              className="btn btn-outline-info"
            >
              <i
                className={`fa-regular fa-pen-to-square ${
                  enterEdit ? "fa-bounce" : ""
                }`}
              ></i>
            </button>
            <EditNote
              title={title}
              desc={description}
              tag={tag}
              id={props.note._id}
            />

            <button
              type="button"
              onMouseEnter={() => {
                setEnterDel(true);
              }}
              onMouseLeave={() => {
                setEnterDel(false);
              }}
              onClick={handleDelClick}
              className="btn btn-outline-danger"
            >
              <i
                className={`fa-solid fa-trash ${enterDel ? "fa-bounce" : ""}`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
