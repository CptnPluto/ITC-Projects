import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./components/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    //   <React.StrictMode>
    <AuthContextProvider>
        <Router>
            <App />
        </Router>
    </AuthContextProvider>
    //   </React.StrictMode>
);
