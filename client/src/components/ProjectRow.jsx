import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectsMutations";
import { GET_PROJECTS } from "../queries/projectsQueries";

export default function ProjectRow({ project }) {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  return (
    <tr onClick={() => navigate(`/project/${project.id}`)}>
      <td>{project.name}</td>
      <td>{project.description}</td>
      <td>{project.status}</td>
      <td>{project.client.name}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              deleteProject();
            }}
          />
        </button>
      </td>
    </tr>
  );
}
