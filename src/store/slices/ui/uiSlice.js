import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShowSidebar: false,
  showProfile: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToggleSidebar: ( state ) => {
      state.isShowSidebar = !state.isShowSidebar;
    },
    setOpenSidebar: ( state ) => {
      state.isShowSidebar = true;
    },
    setCloseSidebar: ( state ) => {
      state.isShowSidebar = false
    },
    setActiveProfileView: ( state ) => {
      state.showProfile = true;
    },
    setDisableProfileView: ( state ) => {
      state.showProfile = false;
    }
   },
});

export const {
  setToggleSidebar,
  setOpenSidebar,
  setCloseSidebar,
  setActiveProfileView,
  setDisableProfileView,
} = uiSlice.actions;

export default uiSlice.reducer;