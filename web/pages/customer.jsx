import React from "react";
import Hero from "../components/Hero/heroCustomer";
import { CustomerLayout } from "../layouts/customerLayout";
export const CustomerPage = () =>{
return(
    <>
    <CustomerLayout>
    <Hero/>
    </CustomerLayout>
    </>
)
}