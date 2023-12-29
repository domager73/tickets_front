import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            {/* подстановочный путь */}
            <Route path="main" element={<App/>} />
            <Route path="*" element={<Login/>} />
        </Routes>
    </BrowserRouter>
);
