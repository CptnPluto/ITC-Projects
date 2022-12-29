import "./ComponentCSS.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImBlogger2 } from "react-icons/im";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

//------------------//

const NavBar = () => {
    // Import the logout function.
    const { logout } = useLogout();

    // State to keep track of which page is active.
    const [active, setActive] = useState(
        localStorage.getItem("ACTIVE")
            ? JSON.parse(localStorage.getItem("ACTIVE"))
            : "home"
    );

    // Get the user state from useAuthContext
    const { user } = useAuthContext();

    // Update the active state and in local storage.
    const handleActive = (e) => {
        setActive(e.target.id);
        const data = JSON.stringify(e.target.id);
        localStorage.setItem("ACTIVE", data);
    };

    return (
        <nav className="navbar">
            {/* If there is no user, show the login and signup links. */}
            {!user && (
                <>
                    <li className="first">
                        <span className="icon">
                            <ImBlogger2 />
                        </span>
                    </li>

                    <li className="second">
                        <Link
                            id="signup"
                            to="/signup"
                            className={
                                active === "signup" ? active : "inactive"
                            }
                            onClick={handleActive}
                        >
                            Sign Up
                        </Link>
                    </li>
                    <li className="third">
                        <Link
                            id="login"
                            to="/login"
                            className={active === "login" ? active : "inactive"}
                            onClick={handleActive}
                        >
                            Login
                        </Link>
                    </li>
                </>
            )}
            {/* If there is a user, show the home, profile, and logout links. */}
            {user && (
                <>
                    <li className="first">
                        <span className="icon">
                            <ImBlogger2 />
                        </span>
                        <Link
                            id="home"
                            to="/"
                            className={active === "home" ? active : "inactive"}
                            onClick={handleActive}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="second">
                        <Link
                            id="profile"
                            to="/profile"
                            className={
                                active === "profile" ? active : "inactive"
                            }
                            onClick={handleActive}
                        >
                            Profile
                        </Link>
                    </li>
                    <li className="third inactive" id="logout" onClick={logout}>
                        Log Out
                    </li>
                </>
            )}
        </nav>
    );
};

export default NavBar;
