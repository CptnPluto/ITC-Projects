//TD: Import all the user related custom hooks from the hooks folder.

import { createContext, useReducer, useEffect } from "react";
import { auth } from "../../firebase/config";

//Firebase imports
import { onAuthStateChanged, getAuth, updateProfile } from "firebase/auth";

//------------------//

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        case "AUTH_IS_READY":
            return { ...state, user: action.payload, authIsReady: true };
        case "EDIT":
            return { ...state, }
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    //useReducer has a function responsible for updating state, and a default state value.
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    });

    // If firestore sees a user logged in, "user" will return a value. Otherwise null.
    useEffect(() => {
        //Will also run every time there is a userAuth change. Kind of like a listener.
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({ type: "AUTH_IS_READY", payload: user });
            //Since this is a listener that we don't want to add every time onAuthStateChange, we unsubsubscribe. Like with onSnapshot.
            unsub();
        });
    }, []);

    const handleProfileEdit = async (text) => {
        try {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                displayName: text,
            });
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleProfileEdit }}>
            {children}
        </AuthContext.Provider>
    );
};
