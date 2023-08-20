import { Routes, Route } from "react-router-dom";
import ErrorPage from "./layouts/error";
import { AuthProvider, RequireAuth } from "./hooks/auth/useAuth";
import AdminHome from "./layouts/users/admin/home";
import CommonHome from "./layouts/home/home";
import LoginScreen from "./layouts/login";
import NavBar from "./navBar";
import CourseUser from "./layouts/users/student/views/course";
import GradeUser from "./layouts/users/student/views/grade";
import UserHome from "./layouts/users/student/home";

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
                <Route path="/" element={<><NavBar /><CommonHome /></>} />
                <Route path="/login" element={<><LoginScreen /></>} />
                <Route element={<RequireAuth props={{ clearance: 0 }} />}>
                    <Route path="/grade" element={<><NavBar /><GradeUser /></>} />
                    <Route path="/course" element={<><NavBar /><CourseUser /></>} />
                    <Route path="/home" element={<><NavBar /><UserHome /></>} />
                    <Route path="/test" element={<><NavBar /><AdminHome /></>} />
                </Route>
                <Route element={<RequireAuth props={{ clearance: 2 }} />}>
                    <Route path="/admin" element={<><NavBar /><AdminHome /></>} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
