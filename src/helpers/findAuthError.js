import { authErrors } from "../firebase";

export const findAuthError = ( errorMessage ) => {
  for (const value in authErrors) {
    if (errorMessage.includes(value)) {
      return authErrors[value];
    }
  }
  return errorMessage;
}