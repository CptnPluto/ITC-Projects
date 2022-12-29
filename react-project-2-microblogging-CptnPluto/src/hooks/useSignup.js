import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

//Firebase imports
import { auth, db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

//------------------//

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    // 1. Create new authenitcated user in Firebase auth
    // 2. Create new user in "users" collection
    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            // alert("User successfully added!");

            if (!res) {
                throw new Error("Could not complete signup");
            }

            //Add display name to user
            await updateProfile(res.user, {
                displayName,
                photoURL:
                    "https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg",
            });

            //Dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });

            //Add user to "users" collection
            await addUser(res.user, password);

            //Update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
            return res.user;
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    };


    // A little repetitive for my taste, but didn't have time to consolidate with the above login function.
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
                const password = "";
                await addUser(userCreds.user, password);
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
    const addUser = async (user, password) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.displayName,
                password: password,
                photoURL:
                    user.photoURL ||
                    "https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg",
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Manual cleanup function: if component umounts (i.e. we navigate away), stop the hook from changing state.
    useEffect(() => {
        return () => {
            setIsCancelled(true);
        };
    }, []);

    return { error, isPending, signup, googleLogin };
};
