import { useDispatch } from "react-redux";
import { getDateInYMD, getSubstring } from "../"
import { setActiveProject, setCloseSidebar, setDisableProfileView, startDeleteProjectById } from "../../store";
import { memo } from "react";

const classAnimationEntrance = 'animate__animated animate__fadeInLeft animate__faster';

export const ProjectListItem = memo(({ id, title, description, start, end }) => {
  const dispatch = useDispatch();
  const newTitle = getSubstring(title, 0, 20);
  const newDescription = getSubstring(description, 0, 30);
  const startDate = getDateInYMD( start );
  const endDate = getDateInYMD( end );

  const onActiveProject = () => {
    dispatch( setCloseSidebar() );
    dispatch( setDisableProfileView() );
    dispatch( setActiveProject({ id }) );
  }

  return (
    <li className={`${classAnimationEntrance} flex items-center justify-between py-2 border-white hover:border-violet border-y-[1px] text-violet hover:bg-gradient-to-l from-purple-50 to-purple-200 duration-75`}>
      <div
        className="h-full w-[100%]"
        onClick={ onActiveProject }
      >
        <h6 className="font-bold">{ newTitle }</h6>
        <p className="block">{ newDescription }</p>
        <small className="text-xs text-violet-light font-normal">Inicio: { startDate }, Fin: { endDate }</small>
      </div>

      <button
        className="bg-violet hover:bg-violet-medium rounded-2xl px-1 duration-75"
        onClick={() => dispatch( startDeleteProjectById( id ) )}
      >
        <i className="bx bx-trash text-white text-lg"></i>
      </button>
    </li>
  )
})