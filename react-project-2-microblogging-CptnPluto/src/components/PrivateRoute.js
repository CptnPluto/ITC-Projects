import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//------------------//

const PrivateRouteAuthed = ({ children }) => {
    const { user } = useAuthContext();

    return user ? children : <Navigate to="/login"></Navigate>;
};

const PrivateRouteUnAuthed = ({ children }) => {
    const { user } = useAuthContext();

    return !user ? children : <Navigate to="/"></Navigate>;
};

export { PrivateRouteAuthed, PrivateRouteUnAuthed };
