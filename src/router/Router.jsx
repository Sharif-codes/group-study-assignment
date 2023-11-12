import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CreateAssignment from "../pages/create-assignment/CreateAssignment";
import MyAssignment from "../pages/myAssignment/MyAssignment";
import SubmittedAssignment from "../pages/submittedAssignment/SubmittedAssignment";
import AllAssignment from "../pages/AllAssignment/AllAssignment";
import SingleAssignment from "../pages/SingleAssignment/SingleAssignment";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import PrivateRoute from "./PrivateRoute";
import GiveMark from "../pages/GiveMark/GiveMark";
import Errorpage from "../pages/ErrorPage/Errorpage";


const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                index: true,
                element: <Home></Home>,
                loader: ()=> fetch('/feature.json')
            },
            {
                path: '/create-assignments',
                element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute> 
            },
            {
                path: '/my-assignments',
                element: <PrivateRoute><MyAssignment></MyAssignment></PrivateRoute>
            },
            {
                path: '/submitted-assignments',
                element: <PrivateRoute><SubmittedAssignment></SubmittedAssignment></PrivateRoute>
            },
            {
                path: '/all-assignments',
                element: <AllAssignment></AllAssignment>,
                // loader: ()=> fetch('https://group-study-server-rho.vercel.app/get-assignment')
                
            },
            {
                path: '/single-assignment/:id',
                element: <PrivateRoute><SingleAssignment></SingleAssignment></PrivateRoute> ,
                loader: ({params})=> fetch(`https://group-study-server-rho.vercel.app/single-assignment/${params.id}`)

            },
            {
                path: '/update-assignment/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({params})=> fetch(`https://group-study-server-rho.vercel.app/update-assignment/${params.id}`)
            },
            {
                path: '/give-mark/:id',
                element: <PrivateRoute><GiveMark></GiveMark></PrivateRoute>,
                loader: ({params})=> fetch(`https://group-study-server-rho.vercel.app/give-mark/${params.id}`)
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path:"/signup",
        element: <Signup></Signup>
    }
]);

export default router;