import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { startCreateUserWithEmailAndPassword, startLogoutUser, startSignInWithEmailAndPassword, startSignInWithGoogle, startUpdateProfile } from "../../../firebase"
import { login, logout, setError, setIsLoading, startLoadingLogin, updateProfile } from './'
import { firebaseStorage } from "../../../firebase";

export const startCreateUserWithEmailAndPasswordThunk = ( userEmail, userPassword ) => {
  return async ( dispatch ) => {
    dispatch( startLoadingLogin() );

    const {
      uid, displayName, email, photoURL, providerData, errorMessage, error
    } = await startCreateUserWithEmailAndPassword( userEmail, userPassword );

    if (error) {
      dispatch( setError({ errorMessage }) )
      dispatch( logout() );
      return;
    };
    dispatch( login({ uid, displayName, email, photoURL, providerData }));
  }
}

export const startSignInUserWithEmailAndPasswordThunk = ( username, password ) => {
  return async ( dispatch ) => {
    dispatch( startLoadingLogin() );

    const {
      uid, displayName, email, photoURL, providerData, errorMessage, error
    } = await startSignInWithEmailAndPassword( username, password );

    if (error) {
      dispatch( setError({ errorMessage }) );
      dispatch( logout() );
      return;
    }
    dispatch( login({ uid, displayName, email, photoURL, providerData }) );
  }
}

export const startSignInWithGoogleThunk = () => {
  return async ( dispatch ) => {
    dispatch( startLoadingLogin() );

    const {
      uid, displayName, email, photoURL, providerData, errorMessage, error
    } = await startSignInWithGoogle();

    if (error) {
      dispatch( setError({ errorMessage }) );
      dispatch( logout() );
      return;
    }
    dispatch( login({ uid, displayName, email, photoURL, providerData }) );
  }
}

export const startUpdateProfileThunk = ( newDisplayName, newImage ) => {
  return async ( dispatch, getState ) => {
    dispatch( setIsLoading() );
    const { uid } = getState().auth;

    if (newImage) {
      const imageRef = ref( firebaseStorage, `/${ uid }/profile-image.png` );
      await uploadBytes( imageRef, newImage );
      const newPhotoURL = await getDownloadURL( imageRef );

      const { displayName, photoURL } = await startUpdateProfile( newDisplayName, newPhotoURL );
      dispatch( updateProfile({ displayName: displayName, photoURL: photoURL }) );
    } else {
      const { displayName, photoURL } = await startUpdateProfile( newDisplayName );
      dispatch( updateProfile({ displayName: displayName, photoURL: photoURL }) );
    }
  }
}

export const startSignOutThunk = () => {
  return async ( dispatch ) => {
    await startLogoutUser();
    dispatch( logout() );
  }
}