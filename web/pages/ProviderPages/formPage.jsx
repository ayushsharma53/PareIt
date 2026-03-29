import React from "react";
import Hero from "../../components/Hero/heroSitter";
import { SitterLayout } from "../../layouts/sitterLayout";
import { useToast } from "../../components/ui/Toast";

export const FormPage = () =>{
return(
    <>
    <SitterLayout >
    <Hero/>
    </SitterLayout>
    </>
)
}