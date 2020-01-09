import React from "react";
import { AddClientForm } from './AddClientForm';

function addClient (currentClients, newClient) {
  return [...currentClients, newClient];
}

export class ClientList extends React.Component {
  state = {
    clientList: [
      {
        id: 1,
        name: 'David Lynch',
        phone: '+375444444444'
      }
    ]
  }
  nextId = 2;

  render() {
    return (
      <>
      <AddClientForm
      onSave={(name, phone) => {
        const client = {
          id: this.nextId,
          name,
          phone
        }
        this.nextId++;
        this.setState({
          clientList: addClient(this.state.clientList, client)
        })
      }}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {this.state.clientList.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
  }
}
