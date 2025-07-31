import { motion } from "framer-motion";
import { useState } from "react";
import profileImage from "../assets/my_profile_pic.png";
import Button from "../components/common/Buttons";
import ResumeModal from "../components/common/ResumeModal";
import Footer from "../components/layout/Footer";
import { Role } from "../types/types";

const roles: Role[] = [
  { name: "Full Stack Developer", icon: "fas fa-code" }, // Generic code icon
  { name: "Android Native", icon: "fab fa-android" }, // Android icon
  { name: "Flutter", icon: "devicon-flutter-plain" }, // Flutter icon (ensure Font Awesome supports it)
  { name: "MERN Stack", icon: "fab fa-node-js" }, // Node.js icon for MERN
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
              <span className="hello">Hello</span>
              <span className="name">I'm Umair</span>
              <span className="title">Full Stack Developer</span>
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
            <div className="profile-background"></div>
            <motion.img
              src={profileImage}
              alt="Profile"
              className="img-fluid"
              style={{
                maxWidth: "250px",
                position: "relative",
                zIndex: 4,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container.py-5">
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
                <p>
                  Started my programming journey in 2021, and since then I've
                  grown into a skilled
                  <strong> Full Stack Developer</strong> with hands-on
                  experience in both Web (
                  <span className="highlight">MERN Stack</span>) and Mobile (
                  <span className="highlight">Android Native + Flutter</span>)
                  development.
                </p>

                <p>
                  I’ve contributed to a wide range of projects across domains
                  like
                  <strong>Education, Medical, IoT, E-commerce,</strong> and{" "}
                  <strong>SaaS</strong>. With a strong ability to learn and
                  adapt quickly, I’m not limited to any specific technology or
                  framework.
                </p>

                <p>
                  Continuously evolving, I’m currently diving into
                  <span className="highlight">Deep Learning</span> to expand my
                  expertise and build intelligent, automated solutions.
                </p>
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
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Home;
