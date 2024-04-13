import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, startGetProjects } from "../store";
import { firebaseAuth } from "../firebase/config";

export const useCheckingAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged( firebaseAuth, (user) => {
        if (!user) return dispatch( logout() );

        console.log(user);

        const { uid, displayName, email, photoURL, providerData } = user;
        dispatch( login({ uid, displayName, email, photoURL, providerData }) );
        dispatch( startGetProjects() );
      })
    }, 250);
  }, [])
}