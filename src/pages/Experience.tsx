import { motion } from "framer-motion";
import "../styles/experience.css";

const Experience = () => {
  const experienceVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="experience-page container py-5">
      {/* Caution Note */}
      <div className="caution-note mb-5">
        <p>
          Certifications and Contracts will be provided on demand for
          verification
        </p>
      </div>

      <section className="experience-section">
        {/* Heading */}
        <motion.h2
          className="experience-heading mb-5"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          My Experience
        </motion.h2>

        {/* Timeline */}
        <div className="timeline">
          {/* Freelancer */}
          <motion.div
            className="timeline-item left"
            variants={experienceVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <div className="timeline-content">
              <h3 className="timeline-title">Freelancer</h3>
              <p className="timeline-duration">1 Year</p>
              <p className="timeline-description">
                With over <strong>1 year of experience</strong> as a Freelancer,
                I have honed my ability to independently manage and deliver
                projects with precision. My expertise spans the full project
                lifecycle, from gathering requirements to deployment, ensuring
                timely delivery and client satisfaction. I thrive in dynamic
                environments, consistently adapting to diverse technical
                challenges.
              </p>
            </div>
          </motion.div>

          {/* Junior App Developer */}
          <motion.div
            className="timeline-item right"
            variants={experienceVariants}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <div className="timeline-content">
              <h3 className="timeline-title">Junior App Developer</h3>
              <p className="timeline-duration">1+ Years</p>
              <p className="timeline-company">
                Center for Advance Solutions
                <a
                  href="https://www.linkedin.com/company/center-for-advance-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link"
                >
                  <i className="fas fa-link"></i>
                </a>
              </p>
              <p className="timeline-description">
                Over <strong>1+ years</strong> as a Junior App Developer at{" "}
                <strong>Center for Advance Solutions</strong>, I specialized in
                Android Native and Flutter development, crafting high-quality
                mobile applications. I contributed to a diverse portfolio of
                apps across categories like{" "}
                <span className="highlight">Ecommerce</span>,{" "}
                <span className="highlight">Productivity</span>, and{" "}
                <span className="highlight">Social Interaction</span>, enhancing
                user experiences through intuitive design and robust
                functionality. My role involved close collaboration with
                cross-functional teams, ensuring seamless integration and
                performance optimization.
              </p>
            </div>
          </motion.div>

          {/* Contract-Based Projects */}
          <motion.div
            className="timeline-item left"
            variants={experienceVariants}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true }}
          >
            <div className="timeline-content">
              <h3 className="timeline-title">Contract-Based IoT Projects</h3>
              <p className="timeline-duration">2 Projects</p>
              <p className="timeline-company">
                MachaDev
                <a
                  href="https://www.linkedin.com/company/machadev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link"
                >
                  <i className="fas fa-link"></i>
                </a>
              </p>
              <p className="timeline-description">
                I successfully completed{" "}
                <strong>two contract-based IoT projects</strong> for{" "}
                <strong>MachaDev</strong>, gaining hands-on experience in the{" "}
                <span className="highlight">IoT</span> domain. These projects
                involved integrating hardware and software solutions to deliver
                innovative, real-time systems for smart applications. My
                contributions included developing scalable architectures and
                ensuring reliable data communication, further solidifying my
                expertise in this cutting-edge field.
              </p>
            </div>
          </motion.div>

          {/* Senior Full Stack Developer */}
          <motion.div
            className="timeline-item right"
            variants={experienceVariants}
            initial="hidden"
            whileInView="visible"
            custom={3}
            viewport={{ once: true }}
          >
            <div className="timeline-content">
              <h3 className="timeline-title">Senior Full Stack Developer</h3>
              <p className="timeline-duration">Present</p>
              <p className="timeline-company">
                Center for Advance Solutions
                <a
                  href="https://www.linkedin.com/company/center-for-advance-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link"
                >
                  <i className="fas fa-link"></i>
                </a>
              </p>
              <p className="timeline-description">
                Currently, I serve as a{" "}
                <strong>Senior Full Stack Web and App Developer</strong> at{" "}
                <strong>Center for Advance Solutions</strong>, where I lead
                end-to-end development of web and mobile applications. My role
                encompasses designing scalable architectures, implementing
                responsive frontends, and building robust backend systems,
                ensuring seamless user experiences. I actively mentor junior
                developers, fostering a collaborative environment while driving
                innovation in every project.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
