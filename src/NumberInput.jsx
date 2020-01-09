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

export class NumberInput extends React.Component {
  state = {
    phoneNumber: "",
    maxlength: 13,
    isTouched: false
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
      isTouched: true
    });
  };

  render() {
    return (
      <input
        style={this.setStyle(
          this.state.isTouched,
          isValidPhoneNumber(this.state.phoneNumber)
        )}
        type="text"
        name="phoneNumber"
        maxLength={this.state.maxlength}
        value={this.state.phoneNumber}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
