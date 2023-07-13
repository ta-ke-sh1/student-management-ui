import { Routes, Route } from "react-router-dom";
import ErrorPage from "./layouts/error";
import { AuthProvider, RequireAuth } from "./hooks/auth/useAuth";
import AdminHome from "./layouts/admin/home";
import CommonHome from "./layouts/home";
import LoginScreen from "./layouts/login";
import ScheduleHome from "./layouts/schedule/views/schedule";
import RequestHome from "./layouts/requests/main";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<CommonHome />} />
                <Route path="/schedule" element={<ScheduleHome />} />
                <Route path="/requests" element={<RequestHome />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route element={<RequireAuth props={{ clearance: 4 }} />}>
                    <Route path="/admin" element={<AdminHome />} />
                </Route>
                <Route element={<RequireAuth props={{ clearance: 3 }} />}>
                    <Route path="/staff" element={<AdminHome />} />
                </Route>
                <Route element={<RequireAuth props={{ clearance: 2 }} />}>
                    <Route path="/student" element={<AdminHome />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
