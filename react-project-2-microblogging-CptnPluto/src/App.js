import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
    PrivateRouteAuthed,
    PrivateRouteUnAuthed,
} from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./hooks/useAuthContext";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//------------------//

export function App() {
    const { authIsReady } = useAuthContext();

    return (
        <div className="container">
            {/* Wait for auth to be ready before rendering the app */}
            {authIsReady && (
                <>
                    <NavBar />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PrivateRouteAuthed>
                                    <Home />
                                </PrivateRouteAuthed>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRouteAuthed>
                                    <Profile />
                                </PrivateRouteAuthed>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PrivateRouteUnAuthed>
                                    <Login />
                                </PrivateRouteUnAuthed>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <PrivateRouteUnAuthed>
                                    <Signup />
                                </PrivateRouteUnAuthed>
                            }
                        />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
                </>
            )}
        </div>
    );
}

export default App;
