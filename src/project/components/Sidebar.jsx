import { useSelector } from "react-redux"
import { ProjectList } from "./";
import { BarLoader } from "react-spinners";

export const Sidebar = ({ isShowSidebar }) => {
  const { displayName, photoURL } = useSelector(state => state.auth);
  const { projects } = useSelector(state => state.project);

  return (
    <div className={`z-10 border-r-violet border-r-[1px] bg-white px-2 box-border absolute w-3/4 h-[92vh] top-[8vh] ${ isShowSidebar ? 'translate-x-0':'translate-x-[-100vw]' } md:h-full md:w-full md:translate-x-0 md:top-0 md:relative md:col-span-1 md:row-span-2 duration-200`}>
      <div className="h-[10vh] border-b-violet border-b-[1px] py-1 flex flex-row justify-between items-center">
        <h1 className="text-lg md:text-xl text-violet-light">{ displayName }</h1>
        <img className="h-full rounded-bl-full rounded-br-full border-[2px] border-violet" src={ photoURL || 'src/project/images/user-uknown.png' } alt="Foto de perfil" />
      </div>

      <div className="h-[82vh] md:h-[90vh] overflow-y-auto pr-2">
        <h1 className="text-xl text-violet-light">Tus Proyectos</h1>

        {
          projects
          ? <ProjectList projects={ projects }/>
          : (
            <div className="flex justify-center">
              <BarLoader color="#ca6cff"></BarLoader>
            </div>
          )
        }
      </div>
    </div>
  )
}