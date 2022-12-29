import "./Pages.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const { error, isPending, login, googleLogin } = useLogin();

    // Reference to the input field - essentially getElementById.
    const emailRef = useRef();
    const passRef = useRef();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passRef.current.value);
        } catch (err) {
            console.log(err);
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
                <h1>Log In</h1>
                <div>
                    No account?{" "}
                    <Link id="signup" to="/signup">
                        Sign up here!
                    </Link>
                </div>
                <br></br>
                <label htmlFor="username">Email</label>
                <input
                    ref={emailRef}
                    type="text"
                    id="email"
                    placeholder="Please enter your email"
                />
                <label htmlFor="password" id="passLabel">
                    Password
                </label>
                <input
                    ref={passRef}
                    type="password"
                    id="password"
                    placeholder="Please enter your password"
                />
                {!isPending && (
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>
                )}
                {isPending && <button disabled>Loading</button>}

                <div>
                    <h3 className="or">Or:</h3>
                    <div className="google-button" onClick={handleGoogleSignIn}>
                        <FcGoogle />
                        Sign In With Google
                    </div>
                </div>
            </form>
            {error && <p>{error}</p>}
        </>
    );
};

export default Login;
