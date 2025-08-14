import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./BlogList";
import SinglePost from "./SinglePost";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:slug" element={<SinglePost />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
