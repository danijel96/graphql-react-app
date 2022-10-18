import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/projectsMutations";
import { GET_CLIENTS } from "../queries/clientsQueries";
import { GET_PROJECTS } from "../queries/projectsQueries";
import Spinner from "./Spinner";

export default function AddNewProjectModal() {
  //   const name = useRef();
  //   const email = useRef();
  //   const phone = useRef();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("new");
  const [clientId, setclientId] = useState("");

  const { loading, errors, data: clientsData } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });
  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Fill all fields!");
    }

    addProject(name, description, status);
    setname("");
    setdescription("");
    setstatus("");
    setclientId("");

    // if (
    //   name.current.value === "" ||
    //   email.current.value === "" ||
    //   phone.current.value === ""
    // ) {
    //   return alert("Fill all fields!");
    // }

    // addProject(name.current.value, email.current.value, phone.current.value);
    // name = "";
    // email = "";
    // phone = "";
  }
  if (loading) {
    return <Spinner />;
  }
  if (errors) {
    return <div>{errors.message}</div>;
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Project</div>
        </div>
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    // ref={name}
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    // ref={description}
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Client
                  </label>
                  <select
                    className="form-select"
                    id="clientId"
                    // ref={clientId}
                    value={clientId}
                    onChange={(e) => setclientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {clientsData?.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
