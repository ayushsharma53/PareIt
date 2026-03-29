import {Routes,Route } from "react-router-dom";
import { CustomerPage} from '../pages/customer'
import {ProviderPage} from '../pages/provider'
import { AdminPage } from "../pages/admin";
import { FormPage } from "../pages/ProviderPages/formPage";
import AuthPage from "../pages/AuthPage"
import NotFoundPage from "../pages/Error/Error";
import ProtectedRoute from "../context/ProtectedRoute";
import ProfilePage from "../pages/ProviderPages/profile";
import ErrorPage from "../pages/Error/ErrorMail";
import Explore from "../pages/CustomerPages/Explore";
import ViewProfile from "../pages/CustomerPages/viewProfile";
import MyBookings from "../pages/CustomerPages/MyBookings";
import SitterRequests from "../pages/ProviderPages/SitterRequests"
import ChatLeads from "../pages/ProviderPages/ChatLeads";
import CustomerChats from "../pages/CustomerPages/CustomerChats";
import UserList from "../pages/AdminPages/UserList";
import ViewProviderProfile from "../pages/AdminPages/ViewProviderProfile";
import ActivityLogs from "../pages/AdminPages/ActivityLogs";
export default function AppRoutes(){
    return(
        <Routes>
            {/* public route */}
            <Route path='/' element={<CustomerPage/>}/>
            {/* private routes */}
            <Route path='/provider' element={
                 <ProtectedRoute allowedRoles={['provider']}>
                <ProviderPage/>
                 </ProtectedRoute>
                }/>
            <Route path='/customer' element={
                 <ProtectedRoute allowedRoles={['customer']}>
                <CustomerPage/>
                 </ProtectedRoute>
                }/>
            <Route path='/admin' element={ 
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPage/>
                </ProtectedRoute>
                }/>
            <Route path='/form' element={
                 <ProtectedRoute allowedRoles={['provider']}>
                    <FormPage/>
                  </ProtectedRoute>
                }/>
             <Route path='/profile/:id' element={
                 <ProtectedRoute allowedRoles={['provider']}>
                    <ProfilePage/>
                  </ProtectedRoute>
                }/>
             <Route path='/explore' element={
                 <ProtectedRoute allowedRoles={['customer']}>
                    <Explore/>
                  </ProtectedRoute>
                }/>
            <Route path='/view-sitter/:id' element={
                 <ProtectedRoute allowedRoles={['customer']}>
                    <ViewProfile/>
                  </ProtectedRoute>
                }/>
            <Route path='/bookings' element={
                 <ProtectedRoute allowedRoles={['customer']}>
                    <MyBookings/>
                  </ProtectedRoute>
                }/>
            <Route path='/requests' element={
                 <ProtectedRoute allowedRoles={['provider']}>
                    <SitterRequests/>
                  </ProtectedRoute>
                }/>
            <Route path='/chats-provider' element={
                 <ProtectedRoute allowedRoles={['provider']}>
                    <ChatLeads/>
                  </ProtectedRoute>
                }/>
            <Route path='/chats-customer' element={
                 <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerChats/>
                  </ProtectedRoute>
                }/>
             <Route path='/admin/users' element={
                 <ProtectedRoute allowedRoles={['admin']}>
                    <UserList/>
                  </ProtectedRoute>
                }/>
              <Route path="/admin/provider/:id" element={
                 <ProtectedRoute allowedRoles={['admin']}>
                    <ViewProviderProfile/>
                  </ProtectedRoute>
                }/>
              <Route path="/admin/activity" element={
                 <ProtectedRoute allowedRoles={['admin']}>
                    <ActivityLogs/>
                  </ProtectedRoute>
                }/>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/unauthorized' element={<NotFoundPage/>}/>
             <Route path='/errormail' element={<ErrorPage/>}/>
            <Route path="*" element={<AuthPage/>} />
        </Routes>
    )
}