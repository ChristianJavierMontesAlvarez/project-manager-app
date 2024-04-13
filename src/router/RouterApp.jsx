import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux";
import { ProjectRoutes } from "../project";
import { AuthRoutes } from "../auth";
import { BounceLoader } from "react-spinners";
import { useCheckingAuth } from "../hooks";

export const RouterApp = () => {
  const { status } = useSelector(state => state.auth);
  useCheckingAuth();

  if (status === 'checking') {
    return (
      <div className="bg-violet h-screen flex items-center justify-center">
        <BounceLoader color="#ffffff"></BounceLoader>
      </div>  
    )
  }

  return (
    <Routes>
      {
        status === 'authenticated'
        ? <Route path="/*" element={ <ProjectRoutes /> }/>
        : <Route path="/auth/*" element={ <AuthRoutes />}/>
      }
      <Route path="/*" element={ <Navigate to="/auth/*"/> }/>
    </Routes>
  )
}