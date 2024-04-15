import { memo } from 'react'

export const TaskItem = memo(({ id, content, isDone, onIsDoneToggle, onRemoveTask }) => {
  return (
    <li className="w-auto m-1 p-1 bg-violet flex justify-between items-center rounded-md">
      <input
        className="h-[15px] w-[15px]"
        type="checkbox"
        name='tasks'
        id={ id }
        checked={ isDone }
        onChange={() => onIsDoneToggle( id )}
      />

      <label
        htmlFor={ id }
        className="text-white text-sm md:text-base mx-1"
      >
        { content }
      </label>

      <button
        className="bg-violet hover:bg-violet-medium rounded-full px-1 duration-75"
        type="button"
        onClick={() => onRemoveTask( id )}
      >
        <i className="bx bx-trash text-white text-sm md:text-xl"></i>
      </button>
    </li>
  )
})