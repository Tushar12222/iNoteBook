import React, { useContext, useState } from "react";
import swal from "sweetalert";
import noteContext from "../Context/notes/NoteContext";

const EditNote = (props) => {
  const context = useContext(noteContext);
  const { editNote } = context;
  const [note, setNote] = useState({
    title: props.title,
    description: props.desc,
    tag: props.tag,
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleEditClick = async () => {
    let res = await editNote(props.id, note.title, note.description, note.tag);
    if (res !== undefined) {
      swal({
        title: "Invalid",
        text: res.error,
        icon: "warning",
        dangerMode: false,
      });
    } else {
      swal({
        title: "Success",
        text: "Note has been updated.",
        icon: "success",
        
      });
    }
  };
  return (
    <>
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={note.title}
                    onChange={onChange}
                    name="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    value={note.description}
                    className="form-control"
                    id="message-text"
                    rows={7}
                    onChange={onChange}
                    name="description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Tag:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={note.tag}
                    onChange={onChange}
                    name="tag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleEditClick}
                data-bs-dismiss="modal"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default EditNote;
