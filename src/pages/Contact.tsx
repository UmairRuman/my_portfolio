import { motion } from "framer-motion";
import "../styles/contact.css";

const Contact = () => {
  const contactVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  // Typewriter animation for the heading
  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const headingText = "Contact me to innovate your vision";

  return (
    <div className="contact-page container py-5">
      <section className="contact-section">
        {/* Animated Heading */}
        <motion.h2
          className="contact-heading mb-5"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          {headingText.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <div className="contact-list">
          {/* Contact/WhatsApp Number */}
          <motion.div
            className="contact-card"
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <a href="tel:+923072740036" className="contact-link">
              <i className="fas fa-phone-alt contact-icon"></i>
              <span className="contact-label">Phone/WhatsApp</span>
              <span className="contact-value">+923072740036</span>
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            className="contact-card"
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <a
              href="mailto:programmerumair29@gmail.com"
              className="contact-link"
            >
              <i className="fas fa-envelope contact-icon"></i>
              <span className="contact-label">Email</span>
              <span className="contact-value">programmerumair29@gmail.com</span>
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            className="contact-card"
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true }}
          >
            <a
              href="https://www.linkedin.com/in/umair-ruman-800204285"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <i className="fab fa-linkedin contact-icon"></i>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">umair-ruman</span>
            </a>
          </motion.div>

          {/* GitHub */}
          <motion.div
            className="contact-card"
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            custom={3}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/UmairRuman"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <i className="devicon-github-plain contact-icon"></i>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">UmairRuman</span>
            </a>
          </motion.div>
        </div>

        {/* Call-to-Action Button */}
        <motion.div
          className="contact-cta mt-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a
            href="mailto:programmerumair29@gmail.com"
            className="contact-cta-button"
          >
            Say Hello
            <span className="cta-ripple"></span>
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
