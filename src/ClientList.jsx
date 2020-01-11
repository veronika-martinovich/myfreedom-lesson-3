import React from "react";
import { AddClientForm } from "./AddClientForm";
import { EditClientForm } from "./EditClientForm";

function addClient(currentClients, clientToAdd) {
  return [...currentClients, clientToAdd];
}

function deleteClient(currentClients, clientId) {
  const clientIndex = currentClients.findIndex(
    client => client.id === clientId
  );
  return [
    ...currentClients.slice(0, clientIndex),
    ...currentClients.slice(clientIndex + 1)
  ];
}

function updateClient(currentClients, clientId, fieldsToUpdate) {
  const clientIndex = currentClients.findIndex(
    client => client.id === clientId
  );
  const clientToUpdate = currentClients[clientIndex];
  const updatedClient = { ...clientToUpdate, ...fieldsToUpdate };

  return [
    ...currentClients.slice(0, clientIndex),
    updatedClient,
    ...currentClients.slice(clientIndex + 1)
  ];
}

export class ClientList extends React.Component {
  state = {
    clientList: [
      {
        id: 1,
        name: "David Lynch",
        phone: "+375444444444"
      }
    ],
    clientToEdit: null
  };
  nextId = 2;

  render() {
    if (this.state.clientToEdit) {
      return (
        <EditClientForm
          clientInfo={this.state.clientList.find(
            client => client.id === this.state.clientToEdit
          )}
          onSave={(name, phone) => {
            this.setState({
              clientList: updateClient(
                this.state.clientList,
                this.state.clientToEdit,
                { name, phone }
              ),
              clientToEdit: null
            });
          }}
          onCancel={() => {
            this.setState({
              clientToEdit: null
            });
          }}
        />
      );
    }
    return (
      <>
        <AddClientForm
          onSave={(name, phone) => {
            const client = {
              id: this.nextId,
              name,
              phone
            };
            this.nextId++;
            this.setState({
              clientList: addClient(this.state.clientList, client)
            });
          }}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone number</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.clientList.map((client, index, clientList) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    onClick={() => {
                      this.setState({
                        clientList: deleteClient(clientList, client.id)
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.setState({
                        clientToEdit: client.id
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
