
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login  } from "../components/Login";
import { Home  } from "../components/Home";
import { Navbar  } from "../components/Navbar";

export const RoutesD = () =>{
  return <>
    <BrowserRouter>      
        <Navbar/>
      <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login />} />
        

      </Routes>
    </BrowserRouter>
  </>
}