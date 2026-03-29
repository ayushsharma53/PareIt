import React from "react";
import Hero from "../components/Hero/heroProvider";
import { SitterLayout } from "../layouts/sitterLayout";
export const ProviderPage = () =>{
return(
    <>
    <SitterLayout>
    <Hero/>
    </SitterLayout>
    </>
)
}