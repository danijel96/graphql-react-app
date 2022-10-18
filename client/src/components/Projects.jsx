import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectsQueries";
import AddNewProjectModal from "./AddNewProjectModal";
import ProjectRow from "./ProjectRow";
import Spinner from "./Spinner";

export default function Projects() {
  const { loading, errors, data: projectsData } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Spinner />;
  }
  if (errors) {
    return <p>Error</p>;
  }
  return (
    <>
      <AddNewProjectModal />
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projectsData.projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </tbody>
      </table>
    </>
  );
}
