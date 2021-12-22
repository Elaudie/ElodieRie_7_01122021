import './styles/settings.scss';
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsFeed from "../src/pages/NewsFeed";
import Login from "./pages/Login";

function App () {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/connexion" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;