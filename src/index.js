import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "./styles/main.scss";
import "./styles/schedule.scss";
import "./styles/navBar.scss";
import "./styles/fonts.scss";
import "./styles/home.scss";
import NavBar from "./navBar";
import "./styles/cards.scss";
import "./styles/footer.scss";
import "./styles/widget.scss";
import "./styles/login.scss";
import "./styles/profile.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </LocalizationProvider>
    </React.StrictMode>
);
