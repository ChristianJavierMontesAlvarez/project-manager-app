import { Navigate, Route, Routes } from "react-router-dom"
import { AppPage } from "../"

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <AppPage /> }/>
      <Route path="/*" element={ <Navigate to="/"/> }/>
    </Routes>
  )
}