import React from "react";

const isValidPhoneNumber = number => {
  let numbers = number.split("");
  if (
    number.slice(0, 4) == "+375" &&
    ((numbers[4] == 2 && numbers[5] == 5) ||
      (numbers[4] == 2 && numbers[5] == 9) ||
      (numbers[4] == 3 && numbers[5] == 3) ||
      (numbers[4] == 4 && numbers[5] == 4)) &&
    /* numbers.slice(6).every(n => {
      isFinite(n)
    }) */
    isFinite(numbers[6]) &&
    isFinite(numbers[7]) &&
    isFinite(numbers[8]) &&
    isFinite(numbers[9]) &&
    isFinite(numbers[10]) &&
    isFinite(numbers[11]) &&
    isFinite(numbers[12])
  ) {
    return true;
  } 
};

const isValidName = name => {
  if (name.length >= 4) return true;
}

export class AddClientForm extends React.Component {
  state = {
    name: "",
    phone: "",
    isTouched: {
      name: false,
      phone: false
    }
  };

  setStyle = (isTouched, isValid) => {
    if (isTouched && !isValid) {
      return { borderColor: "red" };
    } else {
      return null
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
        <input
          type="text"
          name="name"
          minLength='4'
          style={this.setStyle(this.state.isTouched.name, isValidName(this.state.name))}
          value={this.state.name}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        <input
          type="text"
          name="phone"
          maxLength='13'
          style={this.setStyle(this.state.isTouched.phone, isValidPhoneNumber(this.state.phone))}
          value={this.state.phone}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        <button
          onClick={() => {
            if (isValidName(this.state.name) && isValidPhoneNumber(this.state.phone)) {
              this.props.onSave(this.state.name, this.state.phone);
              this.setState({
                name: "",
                phone: ""
              });
            }
          }}
        >
          Add
        </button>
      </form>
    );
  }
}
