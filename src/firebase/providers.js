import { GoogleAuthProvider, createUserWithEmailAndPassword, reload, signInWithEmailAndPassword, signInWithRedirect, signOut, updateProfile } from 'firebase/auth';
import { firebaseAuth, authErrors } from './';
import { findAuthError } from '../helpers';

const googleProvider = new GoogleAuthProvider();

export const startCreateUserWithEmailAndPassword = async ( username, password ) => {
  try {
    const userCredential = await createUserWithEmailAndPassword( firebaseAuth, username, password );
    const { uid, email, displayName, photoURL, providerData } = userCredential.user;

    return {
      uid,
      email,
      displayName,
      photoURL,
      providerData,
    }
  } catch (error) {
    const errorMessage = findAuthError( error.message );

    return {
      code: error.code,
      errorMessage: errorMessage,
      error: true,
    }
  }
}

export const startSignInWithEmailAndPassword = async ( username, password ) => {
  try {
    const userCredential = await signInWithEmailAndPassword( firebaseAuth, username, password );
    const { uid, email, displayName, photoURL, providerData } = userCredential.user;

    return {
      uid,
      email,
      displayName,
      photoURL,
      providerData,
    }
  } catch (error) {
    const errorMessage = findAuthError( error.message );

    return {
      code: error.code,
      errorMessage: errorMessage,
      error: true,
    }
  }
}

export const startSignInWithGoogle = async () => {
  try {
    const userCredential = await signInWithRedirect( firebaseAuth, googleProvider);
    const { uid, email, displayName, photoURL, providerData } = userCredential.user;

    return {
      uid,
      email,
      displayName,
      photoURL,
      providerData,
    }
  } catch (error) {
    const errorMessage = findAuthError( error.message );

    return {
      code: error.code,
      errorMessage: errorMessage,
      email: error.customData.email,
      error: true,
    }
  }
}

export const startUpdateProfile = async ( displayName, photoURL ) => {
  try {
    const user = firebaseAuth.currentUser;
    await reload( user );
    await updateProfile( user, {
      displayName,
      photoURL: photoURL || user.photoURL,
    })

    return {
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
  } catch (error) {
    const errorMessage = findAuthError( error.message );

    return {
      code: error.code,
      errorMessage: errorMessage,
      error: true,
    }
  }
}

export const startLogoutUser = async () => {
  try {
    await signOut( firebaseAuth );
  } catch (error) {
    console.log('return error');
  }
}