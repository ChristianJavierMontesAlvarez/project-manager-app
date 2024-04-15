import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { startDeleteProjectById, startUpdateProject } from "../../store";
import { useForm } from "../../hooks/useForm"
import { TaskItem, TextField, getDateInYMD, getYMDToMilliseconds, useTasksControl } from "../";

import { ErrorMessageBox } from "../../components";

const fieldValidations = {
  title: [(val) => val.length, 'El titulo no debe estar vacío.'],
  description: [(val) => val.length, 'La descripción no debe estar vacía.'],
}

export const ProjectView = () => {
  const dispatch = useDispatch();
  
  const { active: project, saveMessage } = useSelector(state => state.project);

  const {
    title, description, start, end, onInputChanged,
    titleInvalid, descriptionInvalid, isFormValid
  } = useForm( project, fieldValidations );

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const {
    tasksState, inputTask, onInputTaskChanged,
    onIsDoneToggle, onAddNewTask, onRemoveTask,
  } = useTasksControl( project.tasks );

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startUpdateProject({
      id: project.id,
      title,
      description,
      start: getYMDToMilliseconds( start ),
      end: getYMDToMilliseconds( end ),
      tasks: tasksState,
    }))
  }

  useEffect(() => {
    if (saveMessage) {
      Swal.fire('Nota actualizada', saveMessage, 'success');
    }
  }, [ saveMessage ])

  return (
    <form
      className="grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-2 md:grid-rows-2 px-8 py-2 gap-3"
      onSubmit={ onSubmit }  
    >
      <div className="absolute right-8 m-2 flex">
        <button
          className="flex items-center p-1 disabled:opacity-75 bg-violet hover:bg-gradient-to-tl hover:from-violet-light hover:to-violet rounded-full duration-75 mr-1"
          type="submit"
        >
          <p className="inline text-white text-xs md:text-base font-semibold">Guardar</p>
          <i className="bx bx-save text-white text-sm md:text-2xl"></i>
        </button>

        <button
          className="flex items-center p-1 disabled:opacity-75 bg-violet hover:bg-gradient-to-tl hover:from-violet-light hover:to-violet rounded-full duration-75"
          type="button"
          onClick={() => dispatch( startDeleteProjectById( project.id ) )}
        >
          <p className="inline text-white text-xs md:text-base font-semibold">Borrar</p>
          <i className='bx bx-trash text-white text-sm md:text-2xl'></i>
        </button>
      </div>

      <div className="row-span-1 md:col-span-2 flex flex-col mt-6">
        <div className="flex flex-col">
          <TextField
            id="title"
            type="text"
            name="title"
            labelTitle="Título"
            value={ title }
            onChange={ onInputChanged }
            error={ titleInvalid && isFormSubmitted }
            errorMessage={ titleInvalid }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-white text-xl font-bold md:text-3xl">Descripcion</label>
          <textarea
            className="bg-violet text-white outline-none border-b-[1px] border-l-[3px] text-base md:text-lg focus:rounded-tr-lg focus:border-l-[7px] p-2 duration-75"
            rows={ 4 }
            type="text"
            name="description"
            value={ description }
            onChange={ onInputChanged }
          />

          {
            descriptionInvalid && <ErrorMessageBox errorMessage={ descriptionInvalid }/>
          }
        </div>
      </div>

      <div className="row-span-1 md:row-span-1 md:col-span-1 flex flex-col">
        <h3 className="w-[200px] md:w-[80%] text-white text-xl font-bold md:text-3xl">Tareas</h3>

        <div className="w-[100%]">
          <input
            className="w-[100%] bg-violet-bg mb-2 p-1 outline-none rounded-lg text-white placeholder:text-slate-100"
            type="text"
            name="newTask"
            placeholder="Ingrese una nueva tarea..."
            value={ inputTask }
            onChange={ onInputTaskChanged }
            onSubmit={() => onAddNewTask}
          />

          <button
            className="relative w-[30px] top-[2px] ml-[-30px] h-[32px] text-white bg-violet rounded-tr-lg rounded-br-lg"
            type="button"
            onClick={ onAddNewTask }
          >
            <i className="bx bx-book-add text-white text-xl"></i>
          </button>
        </div>

        <ul className="h-[250px] bg-violet-bg overflow-y-auto">
          {
            tasksState.map(task => (
              <TaskItem
                key={ task.id }
                { ...task }
                onIsDoneToggle={ onIsDoneToggle }
                onRemoveTask={ onRemoveTask }
              />
            ))
          }
        </ul>
      </div>

      <div className="row-span-1 md:row-span-1 md:col-span-1 flex flex-col">
        <h3 className="text-white text-xl font-bold md:text-3xl">Fechas</h3>

        <div className="flex flex-col mt-2">
          <label htmlFor="" className="text-white font-semibold">Inicio</label>
          <input
            className="md:w-50 text-white bg-violet-bg rounded-md"
            type="date"
            name="start"
            id="start"
            value={ getDateInYMD(start) }
            min={ getDateInYMD( Date() ) }
            onChange={ onInputChanged }
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="" className="text-white font-semibold">Fin</label>
          <input
            className="md:w-50 text-white bg-violet-bg rounded-md"
            type="date"
            name="end"
            id="end"
            value={ getDateInYMD( end ) }
            min={ getDateInYMD( start ) }
            onChange={ onInputChanged }
          />
        </div>
      </div>
    </form>
  )
}