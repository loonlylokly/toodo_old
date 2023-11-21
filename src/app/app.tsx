import React from "react";
import { MainPage } from "pages/mainPage/mainPage";

const ServiceContext = React.createContext(null);

export function App() {  
  return (
    <MainPage />
  )
}

