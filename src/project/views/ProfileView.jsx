import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from "../../hooks/useForm"
import { clearSaveMessage, startUpdateProfileThunk } from "../../store";
import { TextField, useImageUpload } from "../";
import Swal from "sweetalert2";

const formValidations = {
  displayName: [val => val.length >= 6, 'El nombre debe contener por lo menos 6 carácteres.'],
}

const fields = {
  displayName: '',
}

export const ProfileView = () => {
  const { photoURL, displayName: userDisplayName, providers, isLoading, saveMessage } = useSelector(state => state.auth);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    displayName, onInputChanged, onResetForm,
    displayNameInvalid, isFormValid,
  } = useForm( fields, formValidations );
  const { selectedImage, inputRef, onClickButtonRef, onChangeImage, onResetSelectedImage } = useImageUpload();
  const dispatch = useDispatch();

  useEffect(() => {
    if (saveMessage ) {
      Swal.fire('Perfil Actualizado', 'Se ha guardado correctamente.', 'success');
      dispatch( clearSaveMessage() );
    }
  }, [ saveMessage ])

  const onSubmit = async ( event ) => {
    event.preventDefault();

    setIsFormSubmitted(true);
    if (!isFormValid) return;

    dispatch( startUpdateProfileThunk( displayName, selectedImage ) );
    setIsFormSubmitted(false);
    onResetSelectedImage();
    onResetForm();
  }

  return (
    <form
      className="grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-2 md:grid-rows-[auto_auto] p-3 gap-3"
      onSubmit={ onSubmit }
    >
      <div className="absolute right-5 flex">
        <button
          className="flex items-center p-1 bg-violet hover:bg-gradient-to-tl hover:from-violet-light hover:to-violet rounded-full duration-75"
          type="submit"
          disabled={ isLoading }
        >
          <p className="inline text-white text-xs md:text-base font-semibold">Actualizar</p>
          <i className="bx bx-save text-white text-sm md:text-2xl"></i>
        </button>
      </div>

      <div className="row-span-1 md:col-span-2 md:row-span-1 flex justify-center border-b-[1px]">

        {
          photoURL
          ? <img className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full mb-3" src={ photoURL } alt="Foto de perfil" />
          : <img className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full mb-3" src="src/project/images/user-uknown.png" alt="Foto de perfil" />
        }

        <input
          type="file"
          className="hidden"
          ref={ inputRef }
          onChange={ onChangeImage }
          accept="image/*"
        />
        <button
          className="absolute mr-24 mt-4 md:mr-36 md:mt-5 px-1 md:px-3 md:py-2 bg-violet-medium shadow-sm hover:bg-gradient-to-tl from-violet-light to-violet rounded-full hover:shadow-xl shadow-gray-500 duration-75"
          type="button"
          onClick={ onClickButtonRef }
        >
          <i className="bx bx-image-add text-white"></i>
        </button>
      </div>

      <div className="row-span-1 md:col-span-1 md:row-span-1 flex flex-col">
        <h3 className="text-white text-xl font-bold md:text-3xl">Actualizar Datos</h3>

        <div className="flex flex-col mt-2">
          <TextField
            id='displayName'
            type='text'
            name='displayName'
            labelTitle='Nombre Completo'
            value={ displayName }
            onChange={ onInputChanged }
            error={ displayNameInvalid && isFormSubmitted }
            errorMessage={ displayNameInvalid }
          />
        </div>
      </div>

      <div className="row-span-1 md:col-span-1 md:row-span-1 flex flex-col">
        <h3 className="text-white text-xl font-bold md:text-3xl">Datos Actuales</h3>

        <div className="mt-2">
          <h3 className="text-white text-base font-semibold md:text-xl">Nombre Completo:</h3>
          <p className="text-white font-normal mt-2">{ userDisplayName }</p>
        </div>

        <div>
          <h3 className="text-white text-base font-semibold md:text-xl">Cuenta enlazada con:</h3>

          {
            providers?.map(provider => (
              <div className="mt-2" key={ provider.providerId }>
                <div className="bg-white inline px-1 rounded-md mr-1">
                  <i className={`bx bxl-${ provider.providerId.includes('.') ? provider.providerId.split('.')[0]:'gmail' } text-violet`}></i>
                </div>
                <p className="text-white font-normal mt-2 inline">{ provider.email }</p>
              </div>
            ))
          }
        </div>
      </div>
    </form>
  )
}