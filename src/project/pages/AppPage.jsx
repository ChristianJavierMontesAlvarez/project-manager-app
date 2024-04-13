import { useSelector, useDispatch } from "react-redux";
import { ContentLayoutView, Navbar, NothingView, ProfileView, ProjectView, Sidebar } from "../"
import { setToggleSidebar } from "../../store";

export const AppPage = () => {
  const { isShowSidebar, showProfile } = useSelector(state => state.ui);
  const { isActive: projectIsActive } = useSelector(state => state.project);
  const dispatch = useDispatch();

  const onToggleShowSidebar = () => {
    dispatch( setToggleSidebar() );
  }

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-[8vh_92vh] md:grid-cols-[30vw_70vw] md:grid-rows-[10vh_90vh]">
      <Sidebar isShowSidebar={ isShowSidebar }/>
      <Navbar isShowSidebar={ isShowSidebar } onToggleShowSidebar={ onToggleShowSidebar }/>
      {
        (!projectIsActive && !showProfile) && <ContentLayoutView children={ <NothingView /> }/>
      }

      {
        (projectIsActive && !showProfile) && <ContentLayoutView children={ <ProjectView /> }/>
      }

      {
        (!projectIsActive && showProfile) && <ContentLayoutView children={ <ProfileView /> }/>
      }
    </div>
  )
}