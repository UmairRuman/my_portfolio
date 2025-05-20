import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Skills from "../pages/Skills";
import ProjectDetail from "../pages/ProjectDetail"; // Ensure this is imported

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/experiences" element={<Experience />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contacts" element={<Contact />} />
    <Route path="/projects/:projectId" element={<ProjectDetail />} />
    {/* Corrected route */}
  </Routes>
);

export default Router;
