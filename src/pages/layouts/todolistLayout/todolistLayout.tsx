import { Outlet } from "react-router-dom";

export function TodolistLayout() {
  return (
    <>
      <h1>To do List</h1>
      <Outlet />
    </>
  )
}
