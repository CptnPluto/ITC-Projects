// Allows for some additional logic control and conditional checking that we're actually within AuthContextProvider.
// Not strictly necessary, but :shrug

import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";

//------------------//

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be within an AuthContextProvider");
    }

    return context;
};
