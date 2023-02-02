import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/NoteContext";

import swal from "sweetalert";

const Addnote = () => {
  const context = useContext(noteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });
  const { addNote } = context;
  const handleAddClick = async (e) => {
    e.preventDefault();
    let res = "";
    res = await addNote(note.title, note.description, note.tag);
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
        text: "Note has been added.",
        icon: "success",
      });
    }
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div style={{ minHeight: "0px" }}>
        <div className="collapse collapse-horizontal" id="collapseWidthExample">
          <div className="card card-body" style={{ width: "400px" }}>
            <div className="container my-3">
              <div className="d-flex justify-content-between">
                <h3>Add a Note</h3>
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  Close
                </button>
              </div>

              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    onChange={onChange}
                    name="description"
                    rows={7}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag (optional , "General" by default)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    onChange={onChange}
                    name="tag"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleAddClick}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addnote;
