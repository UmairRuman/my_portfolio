import { useRef } from "react";
import { motion } from "framer-motion";
import "../styles/skills.css";

const Skills = () => {
  const flutterSectionRef = useRef<HTMLDivElement>(null);

  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const scrollToFlutterSection = () => {
    flutterSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="skills-page container py-5">
      <section className="skills-section mb-5">
        <h2 className="skills-heading mb-4">Programming Languages</h2>
        <div className="skills-list">
          {["Java", "Dart", "Python", "JavaScript", "C++"].map(
            (skill, index) => (
              <motion.div
                key={skill}
                className="skill-item"
                variants={skillItemVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true }}
              >
                <span className="skill-name">{skill}</span>
              </motion.div>
            )
          )}
        </div>
      </section>

      <section className="skills-section mb-5">
        <h2 className="skills-heading mb-4">Frontend Frameworks</h2>
        <div className="skills-list">
          <motion.div
            className="skill-item"
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <span className="skill-name">Android Native</span>
          </motion.div>
          <motion.div
            className="skill-item skill-item-clickable"
            onClick={scrollToFlutterSection}
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <span className="skill-name">Flutter</span>
          </motion.div>
          <motion.div
            className="skill-item"
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true }}
          >
            <span className="skill-name">React Js</span>
          </motion.div>
        </div>
      </section>

      <section className="skills-section mb-5">
        <h2 className="skills-heading mb-4">Backend Services</h2>
        <div className="skills-list">
          {["Firebase", "Supabase", "Node.js & Express.js"].map(
            (skill, index) => (
              <motion.div
                key={skill}
                className="skill-item"
                variants={skillItemVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true }}
              >
                <span className="skill-name">{skill}</span>
              </motion.div>
            )
          )}
        </div>
      </section>

      <section ref={flutterSectionRef} className="skills-section mb-5">
        <h2 className="skills-heading mb-4">Flutter-Specific Skills</h2>
        <div className="skills-list">
          <motion.div
            className="skill-item"
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <span className="skill-name">State Management: Riverpod</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
