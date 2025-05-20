import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/projects.css";

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string[];
}

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const rotationRef = useRef<number>(0);
  const isRotating = useRef<boolean>(false);
  const [topProjectIndex, setTopProjectIndex] = useState<number>(0);
  const isHovering = useRef<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 1;

  const navigate = useNavigate();
  const radius = 200;

  // Fetch projects from backend with debugging
  useEffect(() => {
    fetch("http://localhost:5000/api/projects?page=1&limit=10")
      .then((res) => {
        console.log("Response status:", res.status); // Debug: Check status
        if (!res.ok)
          throw new Error(
            `Failed to fetch projects: ${res.status} ${res.statusText}`
          );
        return res.json();
      })
      .then((data: { results: Project[] }) => {
        console.log("Data received:", data); // Debug: Check data
        setProjects(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err); // Debug: Check error
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Step rotation function (every 3 seconds)
  useEffect(() => {
    if (projects.length === 0) return;

    const rotateToNextPosition = () => {
      if (isRotating.current) return;

      isRotating.current = true;
      const stepAngle = 360 / projects.length;
      const nextAngle = rotationRef.current - stepAngle;
      rotationRef.current = nextAngle;
      setRotationAngle(nextAngle);

      const newTopIndex = (topProjectIndex + 1) % projects.length;
      setTopProjectIndex(newTopIndex);

      if (!isHovering.current) {
        setActiveProject(newTopIndex);
      }

      setTimeout(() => {
        isRotating.current = false;
      }, 1000);
    };

    const interval = setInterval(() => {
      rotateToNextPosition();
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length, topProjectIndex]);

  // Initial setup for top project
  useEffect(() => {
    if (projects.length > 0) {
      setActiveProject(0);
    }
  }, [projects]);

  const handleProjectHover = (index: number): void => {
    isHovering.current = true;
    setActiveProject(index);
  };

  const handleProjectLeave = (): void => {
    isHovering.current = false;
    setActiveProject(topProjectIndex);
  };

  const handleProjectClick = (index: number): void => {
    const projectSection = document.getElementById(
      `project-${projects[index]._id}`
    );
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveProject(index);
    }
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const firstProjectSection = document.getElementById(
        `project-${projects[(newPage - 1) * itemsPerPage]._id}`
      );
      if (firstProjectSection) {
        firstProjectSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  if (loading) return <div className="projects-container">Loading...</div>;
  if (error) return <div className="projects-container">{error}</div>;
  if (projects.length === 0)
    return <div className="projects-container">No projects found.</div>;

  return (
    <div className="projects-container">
      <h2 className="projects-heading">My Projects</h2>

      {/* Carousel */}
      <div className="carousel-container">
        <div className="outer-circle"></div>
        <div className="inner-circle">
          <p className="inner-circle-text">
            {activeProject !== null
              ? projects[activeProject].description
              : projects[topProjectIndex].description}
          </p>
        </div>

        <div
          className="projects-rotation-container"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          {projects.map((project, index) => {
            const angle = (360 / projects.length) * index;
            const isTop = index === topProjectIndex;

            return (
              <div
                key={project._id}
                className="project-position"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {isTop && <div className="top-indicator"></div>}
                <div
                  className="project-card"
                  style={{ transform: `translateX(${radius}px)` }}
                >
                  <div
                    className={`project-content ${
                      isTop ? "active-project" : ""
                    }`}
                    style={{
                      transform: `rotate(${-rotationAngle - angle}deg)`,
                    }}
                    onMouseEnter={() => handleProjectHover(index)}
                    onMouseLeave={handleProjectLeave}
                    onClick={() => handleProjectClick(index)}
                  >
                    <div className="project-icon">
                      {["🚗", "🏠", "📝", "🍲", "🧘", "💬"][index % 6]}
                    </div>
                    <div className="project-title">{project.title}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="project-details-section mt-10">
        {paginatedProjects.map((project, index) => (
          <motion.div
            key={project._id}
            id={`project-${project._id}`}
            className="project-detail-card mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="project-detail-title">{project.title}</h3>
            <p className="project-detail-description">{project.description}</p>
            <div className="image-grid">
              {project.images.slice(0, 6).map((img, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  className="image-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: imgIndex * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(255, 77, 77, 0.3)",
                  }}
                >
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={`${project.title} image ${imgIndex + 1}`}
                    className="project-image"
                    onError={(e) => {
                      console.error("Image load failed:", e);
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </motion.div>
              ))}
            </div>
            <div className="category-tags">
              {project.category.map((cat, catIndex) => (
                <span key={catIndex} className="category-tag">
                  {cat}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        {projects.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
