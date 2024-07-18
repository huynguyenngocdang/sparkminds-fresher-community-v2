
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/error/NotFoundPage";
import { ROUTE_LOGIN, ROUTE_POST_CREATE, ROUTE_POST_DETAILS, ROUTE_POST_EDIT, ROUTE_REGISTER } from "./constants/WebPath";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreatePost from "./pages/posts/CreatePost";
import PostDetailPage from "./pages/posts/PostDetailPage";
import EditPostPage from "./pages/posts/EditPostPage";


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
          <Route path={ROUTE_POST_DETAILS} element={<PostDetailPage />} />
          <Route path={ROUTE_POST_EDIT} element={<EditPostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
