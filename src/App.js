import { Routes, Route } from "react-router-dom";
import ErrorPage from "./layouts/error";
import { AuthProvider, RequireAuth } from "./hooks/auth/useAuth";
import AdminHome from "./layouts/users/admin/home";
import CommonHome from "./layouts/home/home";
import LoginScreen from "./layouts/login";
import ScheduleHome from "./layouts/schedule/views/schedule";
import NavBar from "./navBar";
import CourseUser from "./layouts/users/student/views/course";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="*" element={
                    <>
                        <NavBar />
                        <ErrorPage />
                    </>
                } />
                <Route path="/course" element={<><NavBar /><CourseUser /></>} />
                <Route path="/" element={<><NavBar /><CommonHome /></>} />
                <Route path="/schedule" element={<><NavBar /><ScheduleHome /></>} />
                <Route path="/test" element={<><NavBar /><AdminHome /></>} />
                <Route path="/login" element={<><LoginScreen /></>} />
                <Route element={<RequireAuth props={{ clearance: 0 }} />}>
                    <Route path="/admin" element={<><NavBar /><AdminHome /></>} />
                </Route>
                <Route element={<RequireAuth props={{ clearance: 3 }} />}>
                    <Route path="/staff" element={<><NavBar /><AdminHome /></>} />
                </Route>
                <Route element={<RequireAuth props={{ clearance: 2 }} />}>
                    <Route path="/student" element={<><NavBar /><AdminHome /></>} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
