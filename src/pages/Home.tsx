import { motion } from "framer-motion";
import { useState } from "react";
import profileImage from "../assets/my_profile_pic.png";
import Button from "../components/common/Buttons";
import ResumeModal from "../components/common/ResumeModal";
import { Role } from "../types/types";

const roles: Role[] = [
  { name: "Full Stack Developer", icon: "fas fa-code" },
  { name: "Android Native", icon: "fab fa-android" },
  { name: "Flutter", icon: "fas fa-feather" },
  { name: "MERN Stack", icon: "fab fa-node-js" },
];

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const roleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.5 },
  }),
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <motion.h1
              className="hero-text mb-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Hi, I am Full Stack App and Web Developer
            </motion.h1>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              <Button text="Hire Me" to="/contacts" />
              <Button
                text="My Resume"
                variant="secondary"
                onClick={() => setModalIsOpen(true)}
              />
            </div>
          </div>
          <div className="col-lg-6 text-center position-relative">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "250px", // Reduced size
                height: "350px", // Adjusted to maintain aspect ratio
                background: "linear-gradient(45deg, #0d1117, #010409)",
                borderRadius: "15px",
                opacity: 0.8,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "60%",
                  height: "60%",
                  background:
                    "radial-gradient(circle, rgba(240, 185, 62, 0.2), transparent)",
                  zIndex: 2,
                }}
              />
            </div>
            <motion.img
              src={profileImage}
              alt="Profile"
              className="img-fluid"
              style={{
                maxWidth: "200px", // Further reduced size
                position: "relative",
                zIndex: 3,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container py-5">
        <div className="about-section">
          <div className="row">
            <div className="col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="mb-4">My Roles</h2>
              {roles.map((role, index) => (
                <motion.div
                  key={role.name}
                  className="role-item"
                  variants={roleVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true }}
                >
                  <i className={role.icon}></i>
                  <h4>{role.name}</h4>
                </motion.div>
              ))}
            </div>
            <div className="col-lg-8">
              <h2 className="mb-4">About Me</h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                I have started my programming journey in 2021, I am a full stack
                developer, having working experience in both Web (
                <span className="highlight"> Mern Stack</span>) and App (
                <span className="highlight">Android Native + Flutter</span>). I
                have worked on multiple projects, including IOT , E-commerce and
                SaaS etc. I am capable and flexible to work in any technology
                and framework beacuse my learning capability is not only bound
                to specific framework. I am a fast learner and can adapt to new
                technologies easily. Now i am learning AI specifically{" "}
                <span className="highlight">Deep Learning</span>.
              </motion.p>
              {/* Stats Section */}
              <div className="stats-section">
                <motion.div
                  className="stat-item"
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="stat-value">
                    15<span className="plus">+</span>
                  </div>
                  <div className="stat-label">Projects Completed</div>
                </motion.div>
                <motion.div
                  className="stat-item"
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="stat-value">
                    95<span className="plus">%</span>
                  </div>
                  <div className="stat-label">Client Satisfaction</div>
                </motion.div>
                <motion.div
                  className="stat-item"
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="stat-value">
                    4<span className="plus">+</span>
                  </div>
                  <div className="stat-label">Years of Experience</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark py-4">
        <div className="container text-center">
          <p>
            Email:{" "}
            <a
              href="mailto:programmerumair29@gmail.com"
              className="text-warning"
            >
              programmerumair29@gmail.com
            </a>
          </p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/UmairRuman?tab=repositories"
              className="text-warning"
              target="_blank"
            >
              github.com/UmairRuman
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/umair-ruman-800204285"
              className="text-warning"
              target="_blank"
            >
              linkedin.com/in/umair-ruman
            </a>
          </p>
          <p>
            Contact:{" "}
            <a href="tel:+923072740036" className="text-warning">
              +92307 2740036
            </a>
          </p>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Home;
