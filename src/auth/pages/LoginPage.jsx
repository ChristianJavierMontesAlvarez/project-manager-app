import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { startSignInUserWithEmailAndPasswordThunk, startSignInWithGoogleThunk } from "../../store/"
import { useForm } from "../../hooks"
import { AuthLayout, TextField } from "../"
import { ErrorMessageBox } from "../../components"

const textFields = {
  email: '',
  password: '',
}

const formValidations = {
  email: [val => val.includes('@'), 'El campo debe contener "@".'],
  password: [val => val.length >= 6, 'El campo debe contener por lo menos 6 o más carácteres.'],
}

const classAnimationBox = 'animate__animated animate__fadeInLeft animate__faster';

export const LoginPage = () => {
  const { isLoading, errorMessage} = useSelector(state => state.auth);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    email, password, onInputChanged, emailInvalid, passwordInvalid, isFormValid
  } = useForm( textFields, formValidations );
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);
    if (!isFormValid) return;
    dispatch( startSignInUserWithEmailAndPasswordThunk(email, password) );
  }

  return (
    <AuthLayout>
      <div className={`${ classAnimationBox } flex sm:w-[300px] bg-white px-7 py-20 items-center flex-col text-violet`}>
        <h1 className="text-center text-3xl font-semibold">Iniciar Sesión</h1>

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
              className="min-w-full bg-violet text-white rounded-md block mt-2 w-full hover:bg-violet-medium duration-75 hover:bg-gradient-to-tl from-violet-medium to-violet disabled:opacity-50"
              disabled={ isLoading }
              type="submit"
            >
              Ingresar
            </button>
            <button
              className="min-w-full bg-violet text-white rounded-md block mt-2 w-full hover:bg-violet-medium duration-75 hover:bg-gradient-to-tl from-violet-medium to-violet disabled:opacity-50"
              onClick={() => dispatch( startSignInWithGoogleThunk() )}
              disabled={ isLoading }
            >
              Google
            </button>
          </div>
        </form>

        <small className="mt-3">
          ¿No tienes una cuenta? <Link to="/auth/register" className="font-bold">Regístrate.</Link>
        </small>
      </div>
    </AuthLayout>
  )
}