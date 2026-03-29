import React from "react";
import Hero from "../components/Hero/heroAdmin";
import { AdminLayout } from "../layouts/adminLayout";
export const AdminPage = () =>{
return(
    <>
    <AdminLayout>
    <Hero/>
    </AdminLayout>
    </>
)
}