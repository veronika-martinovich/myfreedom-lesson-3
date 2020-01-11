import React from "react";

export const isValidPhoneNumber = number => {
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

export const isValidName = name => {
  if (name.length >= 4) return true;
};