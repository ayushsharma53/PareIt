import React from "react";
import Sidebar from '../components/Navigation/sidebarAdmin'

export const AdminLayout = ({children}) => {
  return (
    <>
      <Sidebar />
        {children}
    </>
  )
}