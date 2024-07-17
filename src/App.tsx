
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/error/NotFoundPage";
import { ROUTE_LOGIN, ROUTE_POST_CREATE, ROUTE_REGISTER } from "./constants/WebPath";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreatePost from "./pages/posts/CreatePost";


function App() {
  return (
    <Router>
      <div>
        {/* Other components like navigation can go here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path={ROUTE_LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE_POST_CREATE} element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
