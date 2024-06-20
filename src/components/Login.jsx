import { useContext, useState } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'
import { UserContext } from '../context/UserContext';

import { toast } from 'react-toastify';

import useAuth from '../hooks/useAuth';




export const Login = () => {
  const { login } = useAuth();
  const { setUserInfo } = useContext(UserContext);


  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const handleCredentials = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = 'https://localhost:4000/login'
    const params = {
      name: credentials.email,
      pass: credentials.password
    }
    try {
      const response = await axios.post(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      // console.log( response.data.idUser);
      if (response.status == 200) {
        toast.success("Inicio de sesion exitoso!");
        
        const { ID_USER, ID_PERFIL, NAME_USER, TOKEN } = response.data;
        setUserInfo(NAME_USER,ID_USER,ID_PERFIL);
        
        login(TOKEN);
        navigate('/')  

      } else {
        toast.error("Inicio de sesion fallido!");
      }

    } catch (error) {
      // console.log(error);
      if (error.response.status == 404) {
        toast.error("Inicio de sesión fallido! Usuario o contraseña incorrectos.");
      } else {
        toast.error("Inicio de sesión fallido!"); // Mensaje genérico para otros errores
      }

    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Usuario
              </label>
              <div className="mt-2">
                <input
                  onChange={handleCredentials}
                  value={credentials.email}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ingresa correo electronico"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleCredentials}
                  value={credentials.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Ingresa contraseña"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}