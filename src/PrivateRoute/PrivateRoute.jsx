import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const { user, loading } = useAuth();

    if (loading) return <span className="loading loading-spinner loading-lg"></span> ;

    if(!user?.email){
        return <Navigate state={location} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;