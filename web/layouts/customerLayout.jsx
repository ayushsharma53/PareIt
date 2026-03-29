import React from "react";
import Sidebar from '../components/Navigation/sidebarCustomer'
export const CustomerLayout = ({children}) => {
return(
   <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000' }}>
      <Sidebar />
      <main style={{ flex: 1, 
        marginLeft: '53vh', 
        minHeight: '100vh',
        
        }}>
        {children}
      </main>
    </div>

)
}