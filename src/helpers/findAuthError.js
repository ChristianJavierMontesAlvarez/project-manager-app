export const findAuthError = ( authErrors, errorMessage ) => {
  for (const value in authErrors) {
    if (errorMessage.includes(value)) {
      return authErrors[value];
    }
  }
  return errorMessage;
}