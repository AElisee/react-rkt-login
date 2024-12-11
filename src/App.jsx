import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Home from "./views/Home.jsx";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import Header from "./components/Header.jsx";
import Profile from "./views/Profile.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import DashboardHome from "./dashboard/DashboardHome.jsx";
import Settings from "./dashboard/Settings.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!isAuthenticated && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="register" element={<Navigate to="/" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
