//NO LONGER USED. KEEPING IN CASE I NEED SOMETHING FROM IT LATER.



import { createContext, useState, useEffect } from "react";

//Firebase imports
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

//------------------//

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    // UserID is gotten from the "users" collection, and changes depending on the user.
    const [userID, setUserID] = useState(
        localStorage.getItem("USER_ID") ? localStorage.getItem("USER_ID") : ""
    );
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const isAuth = userID ? true : false;

    useEffect(() => {
        const id = localStorage.getItem("USER_ID");
        if (id) {
            getUsername(id);
            getUserEmail(id);
        }
    }, [userID]);

    // Get the username stored in the "users" collection, based off the provided userID.
    const getUsername = async (id) => {
        try {
            const userRef = doc(db, "users", id);
            const userSnap = await getDoc(userRef);
            const user = await userSnap.data().displayName;
            setUsername(user);
        } catch (err) {
            console.log("Getting username error: ", err);
        }
    };

    const getUserEmail = async (id) => {
        try {
            const userRef = doc(db, "users", id);
            const userSnap = await getDoc(userRef);
            const user = await userSnap.data().email;
            setUserEmail(user);
        } catch (err) {
            console.log("Getting username error: ", err);
        }
    };

    // Set the localstorage and local state UserID to specified userID.
    const setupNewUser = async (newID) => {
        setUserID(newID);
        localStorage.setItem("USER_ID", newID);
    };

    // Get reference to the "users" displayName for this userID, then update that, if specified.
    const handleProfileEdit = async (text) => {
        try {
            const userRef = doc(db, "users", userID);
            const userSnap = await getDoc(userRef);
            if (text) {
                await setDoc(userRef, {
                    ...userSnap.data(),
                    displayName: text,
                });
                setUsername(text);
            } else {
                setUsername(userSnap.data().displayName);
            }
        } catch (err) {
            console.log("Error in setupUsername:", err);
        }
    };

    return (
        <UserContext.Provider
            value={{
                username,
                userEmail,
                setUserID,
                userID,
                setupNewUser,
                isAuth,
                handleProfileEdit,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
