import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingAnimation from "../shared/MotionLoading";



const PrivateRoute = ({children}) => {
    const {user,loading}= useContext(AuthContext)
    const location=useLocation()

    if(loading)
    {
        // return <progress className="progress w-56"></progress>
        return <LoadingAnimation></LoadingAnimation>

    }
    if(user)
    {
        return children
    }
    return <Navigate state={location.pathname} replace to='/login'></Navigate>
};

export default PrivateRoute;