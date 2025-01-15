var strongPasswordChecker = function (password) {
  if (!password)
    return { succeeded: false, errorMessage: "Password cannot be empty" };
  const passwordValidCheck = {
    isUpperCase: false,
    isAtLeaseLowerCase: false,
    thereIsAtLeastOneDigit: false,
    atLeastOneSpecialCharater: false,
  };
  const errorMessageObject = {
    isUpperCase: "Password must contain at least one uppercase letter.",
    isAtLeaseLowerCase: "Password must contain at least one lowercase letter.",
    thereIsAtLeastOneDigit: "Password must contain at least one digit.",
    atLeastOneSpecialCharater:
      "Password must contain at least one special character.",
  };
  if (password.length < 8)
    return {
      succeeded: false,
      errorMessage: "Password must be at least 8 characters.",
    };
  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (isUperCase(char)) {
      passwordValidCheck.isUpperCase = true;
    } else if (isLowerCase(char)) {
      passwordValidCheck.isAtLeaseLowerCase = true;
    } else if (isDigit(char)) {
      passwordValidCheck.thereIsAtLeastOneDigit = true;
    } else if (isSpecial(char)) {
      passwordValidCheck.atLeastOneSpecialCharater = true;
    }
  }
  for (let key in passwordValidCheck) {
    if (passwordValidCheck[key] === false) {
      return { succeeded: false, errorMessage: errorMessageObject[key] };
    }
  }
  return { succeeded: true };
};

function isUperCase(char) {
  const code = char.charCodeAt(0);
  return code >= 65 && code <= 90;
}

function isLowerCase(char) {
  const code = char.charCodeAt(0);
  return code >= 97 && code <= 122;
}

function isDigit(char) {
  return !Number.isNaN(parseInt(char));
}

function isSpecial(char) {
  if (isDigit(char)) return false;
  if (isUperCase(char)) return false;
  if (isLowerCase(char)) return false;
  return true;
}
export default strongPasswordChecker;
