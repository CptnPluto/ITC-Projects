import "./Pages.css";
import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const { error, isPending, signup, googleLogin } = useSignup();

    // Reference to the input field - essentially getElementById.
    const usernameRef = useRef();
    const passRef = useRef();
    const passConfRef = useRef();
    const emailRef = useRef();

    // Use UserContext to update the username.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errorInFormVal()) {
            return;
        }

        const newUser = {
            displayname: usernameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
        };

        //Add new user to Firestore
        //Q: is there a way to pass this in more efficiently? Deconstruction?
        await signup(newUser.email, newUser.password, newUser.displayname);
    };

    const errorInFormVal = () => {
        if (
            !usernameRef.current.value ||
            !passRef.current.value ||
            !emailRef.current.value
        ) {
            alert("Please enter a valid username and password.");
            return true;
        } else if (passRef.current.value != passConfRef.current.value) {
            alert("Passwords must match");
            return true;
        } else {
            return false;
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleLogin();
        } catch (err) {
            console.log("Google SignIn Error: ", err);
        }
    };

    return (
        <>
            <form className="profile-form">
                <h1>Signup</h1>

                <label htmlFor="email">Email</label>
                <input
                    className="input"
                    ref={emailRef}
                    type="text"
                    id="email"
                    placeholder="Enter an email"
                />
                <label htmlFor="username">User Name</label>
                <input
                    className="input"
                    ref={usernameRef}
                    type="text"
                    id="username"
                    placeholder="Enter a username"
                />

                <label htmlFor="password">Password</label>
                <input
                    className="input"
                    ref={passRef}
                    type="password"
                    id="password"
                    placeholder="Enter a password"
                />
                <label htmlFor="passwordConf">Confirm Password</label>
                <input
                    className="input"
                    ref={passConfRef}
                    type="password"
                    id="passwordConf"
                    placeholder="Please confirm your password"
                />
                {!isPending && (
                    <button type="submit" onClick={handleSubmit}>
                        Sign up
                    </button>
                )}
                {isPending && <button disabled>Loading</button>}
                <div>
                    <h3 className="or">Or:</h3>
                    <div className="google-button" onClick={handleGoogleSignIn}>
                        <FcGoogle />
                        Sign Up With Google
                    </div>
                </div>
            </form>
            {error && <p>{error}</p>}
        </>
    );
};

export default Signup;
