import { useEffect, useState } from "react"

export const useTasksControl = ( initialState = [] , initialInput = '' ) => {
  const [tasksState, setTasksState] = useState( initialState );
  const [inputTask, setInputTask] = useState(initialInput);

  useEffect(() => {
    setTasksState( initialState );
    setInputTask(initialInput);
  }, [ initialState ])

  const onInputTaskChanged = ({ target }) => {
    setInputTask( target.value );
  }

  const onAddNewTask = () => {
    if (!inputTask.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      content: inputTask,
      isDone: false,
    }

    setTasksState([ ...tasksState, newTask ]);
  }

  const onRemoveTask = ( id ) => {
    const newTasks = tasksState.filter(task => task.id !== id );
    setTasksState( newTasks );
  }

  const onIsDoneToggle = ( id ) => {
    const newTasks = tasksState.map(task => {
      return task.id === id ? { ...task, isDone: !task.isDone }:task;
    })

    setTasksState( newTasks );
  }

  return {
    tasksState,
    inputTask,
    onAddNewTask,
    onRemoveTask,
    onIsDoneToggle,
    onInputTaskChanged,
  }
}