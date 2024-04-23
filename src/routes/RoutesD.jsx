
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login  } from "../components/Login";
import { Navbar  } from "../components/Navbar";

export const RoutesD = () =>{
  return <>
    <BrowserRouter>      
        <Navbar/>
      <Routes>
        
          <Route path="/" element={<h1>Home</h1>} />
        

        
          <Route path="/login" element={<Login />} />
        

      </Routes>
    </BrowserRouter>
  </>
}