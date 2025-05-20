import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/projects.css"; // Reuse the same styles

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string[];
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = React.useState<Project | null>(null);

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data: { results: Project[] }) => {
        const foundProject = data.results.find(
          (p: Project) => p._id === projectId
        );
        if (foundProject) {
          setProject(foundProject);
        } else {
          navigate("/projects"); // Redirect if project not found
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        navigate("/projects");
      });
  }, [projectId, navigate]);

  if (!project) return <div className="projects-container">Loading...</div>;

  return (
    <div className="projects-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="project-detail-title">{project.title}</h2>
        <p className="project-detail-description">{project.description}</p>
        <div className="image-grid">
          {project.images.map((img, imgIndex) => (
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
                  console.error(`Image load failed for ${img}:`, e);
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
        <button
          className="pagination-button mt-4"
          onClick={() => navigate("/projects")}
        >
          Back to Projects
        </button>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
