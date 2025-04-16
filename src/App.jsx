import FirstPage from "./pages/FirstPage"
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SignUpPageWithNavigate from "./components/SignUpWithNavigate";
import LoginPageWithNavigate from "./components/LoginWithNavigate";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import PlanPage from "./pages/PlanPage";
import Testimonials from "./pages/Testimonials";
import MyBookings from "./pages/MyBookings";
import RateUs from "./pages/RateUs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import ManagerLoginPage from "./pages/ManagerLoginPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import BookingHistory from "./pages/BookingHistory";
import ManageEmployeeDashboard from "./pages/ManageEmployeeDashboard";
import PastBooking from "./pages/PastBooking";
import Complain from "./pages/Complain";
import ComplainManagePage from "./pages/ComplainManagePage";
import ComplainHistory from "./pages/ComplainHistory";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin"
import ProtectedRouteManager from "./components/ProtectedRouteManager"
import UserManagement from "./pages/UserManagement";
import ManagerManagement from "./pages/ManagerManagement";
import ParkingStationManagement from "./pages/ParkingStationManagement";
import BookingHistoryAdmin from "./pages/BookingHistoryAdmin";
import ManageComplainAdmin from "./pages/ManageComplainAdmin";
import ManageReview from "./pages/ManageReview";
import ContactRequest from "./pages/ContactRequest";
import ManageAdmins from "./pages/ManageAdmins";

function App() {
  return (
    <Router>
      <Routes>
        {/* Components */}
        <Route path="" element={<FirstPage/>} />
        <Route path="/login" element={<LoginPageWithNavigate/>} />
        <Route path="/SignUp" element={<SignUpPageWithNavigate />} />
        <Route path="/ContactUs" element={<ContactUs />} />

        {/* User Pages */}
        <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage /></ProtectedRoute>}/>
        <Route path="/AboutUs" element={<ProtectedRoute><AboutUs /></ProtectedRoute>}/>
        <Route path="/Plan" element={<ProtectedRoute><PlanPage /></ProtectedRoute>}/>
        <Route path="/Testimonials" element={<ProtectedRoute><Testimonials /></ProtectedRoute>}/>
        <Route path="/MyBookings" element={<ProtectedRoute><MyBookings/></ProtectedRoute>} />
        <Route path="/RateUs" element={<ProtectedRoute><RateUs /></ProtectedRoute>} />
        <Route path="/BookingHistory" element={<ProtectedRoute><BookingHistory/></ProtectedRoute>}/>
        <Route path="/RaiseComplain" element={<ProtectedRoute><Complain/></ProtectedRoute>}/>
        <Route path="/ComplainHistory" element={<ProtectedRoute><ComplainHistory/></ProtectedRoute>}/>

        {/* Manager Pages */}
        <Route path="/ManagerLogin" element={<ManagerLoginPage/>}/>
        <Route path="/ManagerDashboard" element={<ProtectedRouteManager ><ManagerDashboard /></ProtectedRouteManager>} />
        <Route path="/ManageEmployeeDashboard" element={<ProtectedRouteManager ><ManageEmployeeDashboard /></ProtectedRouteManager>}/>
        <Route path="/ManageComplain" element={<ProtectedRouteManager ><ComplainManagePage/></ProtectedRouteManager>}/>
        <Route path="/PastBooking" element={<ProtectedRouteManager ><PastBooking/></ProtectedRouteManager>}/>

        {/* Admins Pages */}
        <Route path="/AdminLogin" element={<AdminLoginPage />}/>
        <Route path="/AdminDashboard" element={<ProtectedRouteAdmin ><AdminDashboard /></ProtectedRouteAdmin>} />
        <Route path="/UserManagement" element={<ProtectedRouteAdmin ><UserManagement/></ProtectedRouteAdmin>}/>
        <Route path="/ManagerManagement" element={<ProtectedRouteAdmin ><ManagerManagement/></ProtectedRouteAdmin>}/>
        <Route path="/ParkingStationManagement" element={<ProtectedRouteAdmin ><ParkingStationManagement/></ProtectedRouteAdmin>}/>
        <Route path="/BookingHistoryAdmin" element={<ProtectedRouteAdmin ><BookingHistoryAdmin/></ProtectedRouteAdmin>}/>
        <Route path="/ManageComplainAdmin" element={<ProtectedRouteAdmin ><ManageComplainAdmin/></ProtectedRouteAdmin>}/>
        <Route path="/ManageReview" element={<ProtectedRouteAdmin ><ManageReview/></ProtectedRouteAdmin>}/>
        <Route path="/ContactRequest" element={<ProtectedRouteAdmin ><ContactRequest/></ProtectedRouteAdmin>}/>
        <Route path="/ManageAdmins" element={<ProtectedRouteAdmin ><ManageAdmins/></ProtectedRouteAdmin>}/>

      </Routes>
    </Router>
  )
}

export default App
