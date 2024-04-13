import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: null,
  isSaving: false,
  saveMessage: null,
  isActive: false,
  active: null,
  errorMessage: null,
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: ( state, action ) => {
      state.projects = action.payload;
    },
    createNewProject: ( state, action ) => {
      state.projects.push( action.payload );
      state.isActive = true;
      state.active = action.payload;
    },
    deleteProject: ( state, action ) => {
      if (state.active?.id === action.payload.id) {
        state.active = null;
        state.isActive = false;
      }
      state.saveMessage = '';
      state.projects = state.projects.filter(project => project.id !== action.payload.id);
    },
    updateProject: ( state, action ) => {
      state.projects = state.projects.map(project => {
        if (project.id === action.payload.id) return { ...action.payload  };
        return project;
      })

      state.saveMessage = `${ action.payload.title }, se ha actualizado correctamente.`;
    },
    setActiveProject: ( state, action ) => {
      if (state.active?.id === action.payload.id) return;
      state.isActive = true;
      state.active = state.projects.find(project => project.id === action.payload.id);
      state.saveMessage = '';
    },
    setErrorMessage: ( state, action ) => {
      state.errorMessage = action.payload;
    },
    startLoading: ( state ) => {
      state.isSaving = true;
      state.saveMessage = '';
    },
    disableProjectView: ( state ) => {
      state.active = null;
      state.isActive = false;
      state.saveMessage = '';
    },
    clearProjects: ( state ) => {
      state.projects = null;
      state.isSaving = false;
      state.saveMessage = null;
      state.isActive = false;
      state.active = null;
      state.errorMessage = null;
    },
   },
});

export const {
  setProjects,
  createNewProject, 
  deleteProject,
  updateProject,
  setActiveProject, 
  startLoading,
  finishLoading,
  disableProjectView,
  clearProjects,
} = projectSlice.actions;

export default projectSlice.reducer;