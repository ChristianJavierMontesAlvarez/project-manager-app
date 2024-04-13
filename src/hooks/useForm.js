import { useState, useEffect, useMemo } from "react";

export const useForm = ( initialState = {}, validations = {} ) => {
  const [formState, setFormState] = useState( initialState );
  const [formValidations, setFormValidations] = useState({});
  const isFormValid = useMemo(() => {
    for (const field in formValidations) {
      if (formValidations[field]) return false;
    }
    return true;
  }, [ formValidations ]);

  useEffect(() => {
    setFormState( initialState );
  }, [ initialState ]);

  useEffect(() => {
    checkValidFields();
  }, [ formState ]);

  const onInputChanged = (event) => {
    const { value, name } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const checkValidFields = () => {
    const newForm = {};
    for (const field in validations) {
      const [ fn, messageError ] = validations[field];
      newForm[`${ field }Invalid`] = fn( formState[field] ) ? null:messageError;
    }

    setFormValidations({ ...newForm });
  }

  const onResetForm = () => {
    setFormState( initialState );
  }

  return {
    ...formState,
    formState,
    ...formValidations,
    isFormValid,
    onInputChanged,
    isFormValid,
    onResetForm,
  }
}