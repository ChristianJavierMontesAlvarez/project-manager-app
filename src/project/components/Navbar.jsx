import { useDispatch } from "react-redux"
import { startSignOutThunk } from "../../store/slices/auth";
import { clearProjects, disableProjectView, setActiveProfileView, setCloseSidebar } from "../../store";

export const Navbar = ({ isShowSidebar, onToggleShowSidebar }) => {
  const dispatch = useDispatch();

  const throwViewProfile = () => {
    dispatch( setCloseSidebar() );
    dispatch( disableProjectView() );
    dispatch( setActiveProfileView() );
  }

  const onLogout =  () => {
    dispatch( startSignOutThunk() );
    dispatch( clearProjects() );
  }

  return (
    <div className="flex bg-violet items-center justify-between md:px-5 col-span-1 row-span-1">
      <button className="text-white mx-3 hover:bg-violet-medium hover:rounded-2xl px-1 duration-75 md:hidden"
        onClick={ onToggleShowSidebar }
      >
        <i className={`${ isShowSidebar ? 'bx bx-x':'bx bx-menu' } text-white text-lg md:text-2xl`}></i>
      </button>

      <h1 className="text-white text-sm md:text-2xl font-semibold">ProjectManagerApp</h1>

      <div>
        <button className="text-white mx-1 hover:bg-violet-medium hover:rounded-2xl px-1 duration-75"
          onClick={ throwViewProfile }
        >
          <i className="bx bxs-user-detail text-lg md:text-2xl" ></i>
        </button>
        <button className="text-white mr-3 hover:bg-violet-medium hover:rounded-2xl px-1 duration-75"
          onClick={ onLogout }
        >
          <i className="bx bx-log-out text-lg md:text-2xl"></i>
        </button>
      </div>
    </div>
  )
}