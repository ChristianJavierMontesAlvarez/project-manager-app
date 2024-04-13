import { BrowserRouter } from "react-router-dom"
import { RouterApp } from "./router"
import { Provider } from "react-redux"
import { store } from "./store/store"

export const ProjectManagerApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter >
        <RouterApp />
      </BrowserRouter>
    </Provider>
  )
}