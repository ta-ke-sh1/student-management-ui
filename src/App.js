import { Routes, Route } from "react-router-dom";
import ErrorPage from "./layouts/error";
import { AuthProvider, RequireAuth } from "./hooks/auth/useAuth";
import AdminHome from "./layouts/users/admin/home";
import CommonHome from "./layouts/home/home";
import LoginScreen from "./layouts/login";
import NavBar from "./navBar";
import CourseUser from "./layouts/course/course";
import GradeUser from "./layouts/users/student/views/grade";
import UserHome from "./layouts/users/student/home";

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <ErrorPage />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <CommonHome />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <LoginScreen />
          </>
        }
      />

      <Route
        path="/grade"
        element={
          <>
            <GradeUser />
          </>
        }
      />
      <Route
        path="/course"
        element={
          <>
            <CourseUser />
          </>
        }
      />
      <Route
        path="/home"
        element={
          <>
            <UserHome />
          </>
        }
      />
      <Route
        path="/test"
        element={
          <>
            <AdminHome />
          </>
        }
      />
      <Route
        path="/admin"
        element={
          <>
            <AdminHome />
          </>
        }
      />
      <Route element={<RequireAuth props={{ clearance: 0 }} />}>
        <Route
          path="/grade"
          element={
            <>
              <GradeUser />
            </>
          }
        />
        <Route
          path="/course"
          element={
            <>
              <CourseUser />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <UserHome />
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <AdminHome />
            </>
          }
        />
      </Route>
      <Route element={<RequireAuth props={{ clearance: 2 }} />}>
        <Route
          path="/admin"
          element={
            <>
              <AdminHome />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
