import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

//Firebase imports
import { auth, db } from "../firebase/config";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

//------------------//

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const userCreds = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (!userCreds) {
                throw new Error("Error logging in");
            }

            dispatch({ type: "LOGIN", payload: userCreds.user });

            // Update state
            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }

            return userCreds;
        } catch (error) {
            if (!isCancelled) {
                console.log(error.message);
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    const googleLogin = async () => {
        setError(null);
        setIsPending(true);

        try {
            const provider = new GoogleAuthProvider();

            const userCreds = await signInWithPopup(auth, provider);

            if (!userCreds) {
                throw new Error("Error logging in");
            }

            dispatch({ type: "LOGIN", payload: userCreds.user });

            //Add user to "users" collection
            const userID = userCreds.user.uid;
            const docSnap = await getDoc(doc(db, "users", userID));
            if (!docSnap.exists()) {
                await addUser(userCreds.user, userID);
            }

            // Update state
            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }

            return userCreds;
        } catch (error) {
            if (!isCancelled) {
                console.log(error.message);
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    //Create new user in "users" collection
    const addUser = async (user, userID) => {
        try {
            await setDoc(doc(db, "users", userID), {
                email: user.email,
                displayName: user.displayName,
                password: "",
                photoURL: user.photoURL || "https://img.freepik.com/free-icon/user_318-804790.jpg?w=2000"
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Cancel any pending state updates on unmount
    useEffect(() => {
        return () => {
            setIsCancelled(true);
        };
    }, []);

    return { error, isPending, login, googleLogin };
};
