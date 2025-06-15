import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "../styles/projects.css";
import carWashLogo from "../assets/car-wash_7050469.png";
import homeManagementLogo from "../assets/home_management_app.png";
import clubAppLogo from "../assets/meditation-app_2159369.png";
import recipeBookAppLogo from "../assets/recipe_book_logo1.png";
import chattingAppLogo from "../assets/Chatting App.png";
import homeAutomationLogo from "../assets/home_automation.png";
import healthBookLogo from "../assets/health_book_logo.png";
import kwelaLogo from "../assets/kwela_logo.png";
import unitConverterLogo from "../assets/unit_converter_logo.png";

interface Project {
  _id: string;
  title: string;

  short_description: string;
  detailed_description: string;
  images: string[];
  category: string[];
  logo?: string; // Optional logo path
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [flippedProjects, setFlippedProjects] = useState<{
    [key: string]: boolean;
  }>({});
  const itemsPerPage = 1;

  // Logo mapping
  const projectLogoMap: { [key: string]: string } = {
    "Car Wash App": carWashLogo,
    "Home Management": homeManagementLogo,
    "Meditation Club App": clubAppLogo,
    "Recipe Book": recipeBookAppLogo,
    "Chat App": chattingAppLogo,
    "Home Automation": homeAutomationLogo,
    "Health Book": healthBookLogo,
    "Unit Converter": unitConverterLogo,
    Kwela: kwelaLogo,
  };

  // Dynamically calculate radius based on screen size
  const [radius, setRadius] = useState<number>(220);

  useEffect(() => {
    const updateRadius = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setRadius(150); // Updated for 9 projects
      } else {
        setRadius(220); // Updated for 9 projects
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Fetch projects from backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}?page=1&limit=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data: { results: Project[] }) => {
        setProjects(data.results);
        // Initialize flipped state for all projects
        const initialFlippedState = data.results.reduce(
          (acc: { [key: string]: boolean }, project: Project) => {
            acc[project._id] = false;
            return acc;
          },
          {}
        );
        setFlippedProjects(initialFlippedState);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
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
  const pendingScrollId = useRef<string | null>(null);

  const handleProjectClick = (index: number) => {
    setCurrentPage(index + 1); // <-- schedule the page switch
    pendingScrollId.current = projects[index]._id; // remember where to scroll
    setActiveProject(index); // this part is fine
  };

  /** scroll *after* the page switch is rendered */
  useEffect(() => {
    if (!pendingScrollId.current) return;

    // wait until the element for the new page exists in the DOM
    const el = document.getElementById(`project-${pendingScrollId.current}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      pendingScrollId.current = null; // done
    }
  }, [currentPage, projects]); // runs whenever the page (DOM) changes

  const handleImageClick = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
  };

  const handleCloseDialog = (): void => {
    setSelectedImage(null);
  };

  const toggleFlip = (projectId: string) => {
    setFlippedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
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

  // Function to calculate dynamic heights based on number of images
  const calculateCardHeight = (numberOfImages: number) => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: 2 images per row, image height 110px, gap 6px
      const imagesPerRow = 2;
      const imageHeight = 110;
      const gap = 6;
      const rows = Math.ceil(numberOfImages / imagesPerRow);
      const imageGridHeight = rows * imageHeight + (rows - 1) * gap;
      // Additional space: title (~30px), tags (~20px), button (~40px), padding/margins (~50px)
      const additionalHeight = 30 + 20 + 40 + 50;
      const cardHeight = imageGridHeight + additionalHeight;
      const flipContainerHeight = cardHeight - 40 - 20; // Subtract button and some margin
      return { cardHeight, flipContainerHeight, imageGridHeight };
    } else {
      // Desktop: 4 images per row, image height 140px, gap 8px
      const imagesPerRow = 4;
      const imageHeight = 140;
      const gap = 8;
      const rows = Math.ceil(numberOfImages / imagesPerRow);
      const imageGridHeight = rows * imageHeight + (rows - 1) * gap;
      // Additional space: title (~40px), tags (~30px), button (~40px), padding/margins (~70px)
      const additionalHeight = 40 + 30 + 40 + 70;
      const cardHeight = imageGridHeight + additionalHeight;
      const flipContainerHeight = cardHeight - 40 - 30; // Subtract button and some margin
      return { cardHeight, flipContainerHeight, imageGridHeight };
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
              ? projects[activeProject].short_description
              : projects[topProjectIndex].short_description}
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
                      <img
                        src={
                          projectLogoMap[project.title] ||
                          "/path/to/default-logo.png"
                        }
                        alt={`${project.title} logo`}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="project-details-section">
        {paginatedProjects.map((project, index) => {
          const { cardHeight, flipContainerHeight, imageGridHeight } =
            calculateCardHeight(project.images.length);

          return (
            <motion.div
              key={project._id}
              id={`project-${project._id}`}
              className="project-detail-card"
              style={{ height: `${cardHeight}px` }} // Dynamic height
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="flip-container"
                initial={false}
                animate={{ rotateY: flippedProjects[project._id] ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: `${flipContainerHeight}px`, // Dynamic height
                }}
              >
                {/* Front Side (Images) */}
                <motion.div
                  className="flip-front"
                  style={{
                    backfaceVisibility: "hidden",
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  <h3 className="project-detail-title">{project.title}</h3>
                  <div className="category-tags">
                    {project.category.map((cat, catIndex) => (
                      <span key={catIndex} className="category-tag">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div
                    className="image-grid-horizontal"
                    style={{ maxHeight: `${imageGridHeight}px` }} // Dynamic max-height
                  >
                    {project.images.map((img, imgIndex) => {
                      const imageUrl = `http://localhost:5000${img}`;
                      return (
                        <motion.div
                          key={imgIndex}
                          className="image-card-horizontal"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: imgIndex * 0.1 }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 20px rgba(255, 77, 77, 0.3)",
                          }}
                          onClick={() => handleImageClick(imageUrl)}
                        >
                          <img
                            src={imageUrl}
                            alt={`${project.title} image ${imgIndex + 1}`}
                            className="project-image-horizontal"
                            onError={(e) => {
                              console.error(
                                `Image load failed for ${imageUrl}:`,
                                e
                              );
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Back Side (Description) */}
                <motion.div
                  className="flip-back"
                  style={{
                    backfaceVisibility: "hidden",
                    position: "absolute",
                    width: "100%",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <h3 className="project-detail-title">{project.title}</h3>
                  <div className="description-content">
                    <p className="project-detail-description-full">
                      {project.detailed_description}
                    </p>
                    <div className="category-tags">
                      {project.category.map((cat, catIndex) => (
                        <span key={catIndex} className="category-tag">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Description Button (Outside Flip Container) */}
              <button
                className="description-button"
                onClick={() => toggleFlip(project._id)}
              >
                {flippedProjects[project._id] ? "Show Images" : "Description"}
              </button>
            </motion.div>
          );
        })}

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

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full-size project image"
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Projects;
