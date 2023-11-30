import { Outlet } from "react-router-dom";

export function TaskLayout() {
  return (
   <>
    <h2>My Task</h2>
    <Outlet />
   </>
  )
}
