import React from "react";
import { isValidPhoneNumber, isValidName } from "./validators";

export class ClientForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.client.name,
        phone: this.props.client.phone,
        purchaseStatus: this.props.client.purchaseStatus,
        isTouched: {
          name: false,
          phone: false
        }
      };
    }
  
    setStyle = (isTouched, isValid) => {
      if (isTouched && !isValid) {
        return { borderColor: "red" };
      } else {
        return null;
      }
    };
  
    onChange = evt => {
      this.setState({
        [evt.target.name]: evt.target.value
      });
    };
  
    onBlur = evt => {
      this.setState({
        isTouched: {
          ...this.state.isTouched,
          [evt.target.name]: true
        }
      });
    };
  
    render() {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            minLength="4"
            style={this.setStyle(
              this.state.isTouched.name,
              isValidName(this.state.name)
            )}
            value={this.state.name}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            maxLength="13"
            style={this.setStyle(
              this.state.isTouched.phone,
              isValidPhoneNumber(this.state.phone)
            )}
            value={this.state.phone}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <label htmlFor="purchaseStatus">Purchase Status</label>
          <select
            name="purchaseStatus"
            id="purchaseStatus"
            value={this.state.purchaseStatus}
            onChange={this.onChange}
          >
            <option disabled selected hidden></option>
            <option value="No purchases">No purchases</option>
            <option value="One purchase">One purchase</option>
            <option value="More purchases">More purchases</option>
          </select>
          <button
            onClick={() => {
              if (
                isValidName(this.state.name) &&
                isValidPhoneNumber(this.state.phone)
              ) {
                this.props.onSave(
                  this.state.name,
                  this.state.phone,
                  this.state.purchaseStatus
                );
                this.setState({
                  name: "",
                  phone: "",
                  purchaseStatus: "",
                  isTouched: {
                    name: false,
                    phone: false
                  }
                });
              }
            }}
          >
            Save
          </button>
          <button onClick={() => this.props.onCancel()}>Cancel</button>
        </form>
      );
    }
  }
  