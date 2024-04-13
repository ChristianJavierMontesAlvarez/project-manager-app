import { firebaseDB } from '../../../firebase/config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { createNewProject, deleteProject, setProjects, startLoading, updateProject } from './projectSlice';

export const startGetProjects = () => {
  return async ( dispatch, getState ) => {
    const { uid } = getState().auth;
    const projects = [];
    try {
      const docsRef = await getDocs(collection( firebaseDB, `${ uid }/project/projects` ));

      docsRef.forEach(doc => {
        projects.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      dispatch(setProjects( projects ));
    } catch (error) {
      console.log('Ha ocurrido un error desconocido. :(');
    }
  }
}

export const startCreateNewProject = () => {
  return async ( dispatch, getState ) => {
    const { uid } = getState().auth;

    try {
      const newProject = {
        title: 'New Project',
        description: 'Add a description...',
        tasks: [],
        start: new Date().getTime(),
        end: new Date().getTime(),
      }

      const docRef = await addDoc(collection( firebaseDB, `${ uid }/project/projects` ), { ...newProject });

      dispatch(createNewProject({
        ...newProject,
        id: docRef.id,
      }))

    } catch (error) {
      console.log('Mostrar una alerta de error.');
    }
  }
}

export const startUpdateProject = ( project ) => {
  return async ( dispatch, getState ) => {
    dispatch( startLoading() );
    const { uid } = getState().auth;

    try {
      const projectRef = { ...project };
      delete projectRef.id;
      const docRef = doc(firebaseDB, `${ uid }/project/projects/${ project.id }`);
      await updateDoc(docRef, {
        ...projectRef
      })

      dispatch(updateProject({ ...project }));
    } catch (error) {
      console.log('Mostrar una alerta de error.', error);
    }
  }
}

export const startDeleteProjectById = ( id ) => {
  return async ( dispatch, getState ) => {
    const { uid } = getState().auth;

    try {
      const docRef = doc(firebaseDB, `${ uid }/project/projects/${ id }`);
      await deleteDoc( docRef );
      dispatch( deleteProject({ id }) );
    } catch (error) {
      console.log('Mostrar una alerta de error.');
    }
  }
}