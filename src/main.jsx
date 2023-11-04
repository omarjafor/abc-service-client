import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './Root/Root';
import Home from './Pages/Home/Home';
import AuthProvider from './Provider/AuthProvider';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile/Profile';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import BookService from './Pages/BookService/BookService';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'bookservice/:id',
        element: <PrivateRoute><BookService></BookService></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        
      }
    ]
  },
  {
    path: 'login',
    element: <Login></Login>
  },
  {
    path: 'register',
    element: <Register></Register>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
    <Toaster></Toaster>
  </React.StrictMode>,
)
