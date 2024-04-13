import { useEffect, useRef, useState } from "react"
import Swall from 'sweetalert2'

export const useImageUpload = ( initialState = null ) => {
  const [selectedImage, setSelectedImage] = useState( initialState );
  const inputRef = useRef();

  useEffect(() => {
    if (selectedImage) {
      Swall.fire('Imagen Cargada', 'no olvides actualizar el perfil.', 'success');
    }
  }, [ selectedImage ])

  const onChangeImage = ({ target }) => {
    setSelectedImage( target.files[0] );
  }

  const onClickButtonRef = () => {
    inputRef.current.click();
  }

  const onResetSelectedImage = () => {
    setSelectedImage( initialState );
  }

  return {
    selectedImage,
    onChangeImage,
    inputRef,
    onClickButtonRef,
    onResetSelectedImage,
  }
}