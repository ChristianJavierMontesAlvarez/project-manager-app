import { useDispatch } from "react-redux";
import { startCreateNewProject, setCloseSidebar, setDisableProfileView } from "../../store";

const classAnimationBox = 'animate__animated animate__fadeIn animate__faster';

export const ContentLayoutView = ({ children }) => {
  const dispatch = useDispatch();

  const onCreateNewProject = async () => {
    dispatch( startCreateNewProject() );
    dispatch( setCloseSidebar() );
    dispatch( setDisableProfileView() );
  }

  return (
    <div className="p-2 col-span-1 row-span-1">
      <div className={`${ classAnimationBox } h-full w-full bg-gradient-to-tl from-violet-light to-violet overflow-y-auto box-border`}>
        { children }

        <button className="absolute right-3 bottom-3 md:right-5 md:bottom-5 px-1 md:px-3 md:py-2 bg-violet-medium hover:bg-gradient-to-tl from-violet-light to-violet rounded-full hover:shadow-xl shadow-black duration-75"
          onClick={ onCreateNewProject }
        >
          <i className="bx bx-plus text-2xl md:text-3xl text-white"></i>
        </button>
      </div>
    </div>
  )
}