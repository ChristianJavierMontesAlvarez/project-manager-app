import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking', 
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  isLoading: false,
  updateMessage: null,
  errorMessage: null,
  providers: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: ( state, action ) => {
      state.status = 'authenticated';
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName || 'Actualiza tu nombre';
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.isLoading = false;
      state.errorMessage = null;
      state.providers = action.payload.providerData;
    },
    logout: ( state ) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.saveMessage = null;
      state.isLoading = false;
      state.providers = null;
    },
    updateProfile: ( state, action ) => {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.saveMessage = 'Se ha guardado los datos correctamente';
      state.isLoading = false;
    },
    clearSaveMessage: ( state ) => {
      state.saveMessage = null;
    },
    setIsLoading: ( state ) => {
      state.isLoading = true;
      state.saveMessage = null;
    },
    startLoadingLogin: ( state ) => {
      state.status = 'checking';
      state.isLoading = true;
    },
    setError: ( state, action ) => {
      state.errorMessage = action.payload.errorMessage;
    },
   },
});

export const {
  login,
  logout,
  setError,
  setIsLoading,
  startLoadingLogin,
  updateProfile,
  clearSaveMessage,
} = authSlice.actions;

export default authSlice.reducer;