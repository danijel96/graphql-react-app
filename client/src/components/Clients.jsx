import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientsQueries";
import AddNewClientModal from "./AddNewClientModal";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

export default function Clients() {
  const { loading, errors, data: clientsData } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner />;
  }
  if (errors) {
    return <p>Error</p>;
  }
  return (
    <>
      <AddNewClientModal />
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientsData.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </>
  );
}
