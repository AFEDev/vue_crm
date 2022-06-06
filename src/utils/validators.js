export function containsUppercase (value) {
    return /[A-Z]/.test(value) 
  };

  export function  containsLowercase (value) {
    return /[a-z]/.test(value)
  };

  export function  containsNumber (value) {
    return /[0-9]/.test(value)
  };

  export function containsSpecial (value) {
    return /[#?!@$%^&*-]/.test(value) 
  };

  export function isChecked (value) {
    return value
  }