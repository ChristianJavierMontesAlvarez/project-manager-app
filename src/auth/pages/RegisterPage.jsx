import { useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout, TextField } from "../"
import { useForm } from "../../hooks";
import { ErrorMessageBox } from "../../components";
import { startCreateUserWithEmailAndPasswordThunk } from "../../store";

const textFields = {
  email: '',
  password: '',
}

const formValidations = {
  email: [val => val.includes('@'), 'El campo debe contener "@".'],
  password: [val => val.length >= 6, 'El campo debe contener por lo menos 6 carácteres.'],
}

const classAnimationBox = 'animate__animated animate__fadeInLeft animate__faster';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector(state => state.auth);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    email, password, onInputChanged, emailInvalid, passwordInvalid, isFormValid
  } = useForm( textFields, formValidations );

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    if (!isFormValid) return;
    dispatch( startCreateUserWithEmailAndPasswordThunk( email, password ) );
  }

  return (
    <AuthLayout>
      <div className={`${ classAnimationBox } flex sm:w-[300px] bg-white px-7 py-20 items-center flex-col text-violet`}>
        <h1 className="text-center text-3xl font-semibold">Crear Cuenta</h1>

        <form className="w-full" onSubmit={ onSubmit }>
          <div className="w-full mt-3">
            <TextField
              id='email'
              name='email'
              type='text'
              labelTitle='Email'
              error={ !!emailInvalid && isFormSubmitted }
              errorMessage={ emailInvalid }
              value={ email }
              onChange={ onInputChanged }
            />
          </div>

          <div className="w-full mt-3">
            <TextField
              id='password'
              name='password'
              type='password'
              labelTitle='Contraseña'
              error={ !!passwordInvalid && isFormSubmitted }
              errorMessage={ passwordInvalid }
              value={ password }
              onChange={ onInputChanged }
            />
          </div>

          {
            errorMessage && <ErrorMessageBox errorMessage={ errorMessage }/>
          }

          <div className="w-full mt-5">
            <button
              className="min-w-full bg-violet text-white rounded-md block mt-2 w-full hover:bg-violet-medium duration-75 hover:bg-gradient-to-tl from-violet-medium to-violet"
              disabled={ isLoading }
              type="submit"
            >
              Registrarme
            </button>
          </div>
        </form>

        <small className="mt-3">
          ¿Ya tienes una cuenta? <Link to="/auth/login" className="font-bold">Inicia Sesión.</Link>
        </small>
      </div>
    </AuthLayout>
  )
}