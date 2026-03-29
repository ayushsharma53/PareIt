import React from "react";
import Sidebar from '../components/Navigation/sidebarSitter'
export const SitterLayout = ({children}) => {
return(
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      <Sidebar />
      {/* This wrapper ensures the content occupies the remaining space */}
      <main style={{ flex: 1, marginLeft: '53vh'}}> 
        {children}
      </main>
    </div>
)
}