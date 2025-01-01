"use client";

import { ReactNode } from "react";
import Header from "../../../component/Header";

interface LayoutProps {
    children: ReactNode;
  }
  
export default function MainLayout({children}: LayoutProps){
    return(
        <>
            <Header/>
            {children}
        </>
    );
}