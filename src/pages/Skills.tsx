import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/skills.css";

// Define the type for flutterTabs
interface FlutterTabs {
  stateManagement: string[];
  paymentIntegration: string[];
  databases: string[];
  generalSkills: string[];
}

// Define the possible tab keys
type TabKey = keyof FlutterTabs;

const Skills = () => {
  const flutterSectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("stateManagement");

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

  const flutterTabs: FlutterTabs = {
    stateManagement: ["Bloc", "Riverpod", "Provider", "GetX"],
    paymentIntegration: ["Stripe", "PayPal", "JazzCash"],
    databases: ["Realm", "MongoDB", "Hive", "SQFlite", "ObjectBox"],
    generalSkills: [
      "APIs (Expert in all RESTful APIs)",
      "Flutter Channels",
      "Flutter Clean Architecture",
      "Navigator 2.0",
      "Pagination",
    ],
  };

  return (
    <div className="skills-page container py-5">
      {/* Programming Languages */}
      <section className="skills-section skills-programming mb-5">
        <h2 className="skills-heading mb-4">Programming Languages</h2>
        <div className="programming-list">
          {[
            { name: "Java", icon: "devicon-java-plain" },
            { name: "Dart", icon: "devicon-dart-plain" },
            { name: "Python", icon: "devicon-python-plain" },
            { name: "JavaScript", icon: "devicon-javascript-plain" },
            { name: "C++", icon: "devicon-cplusplus-plain" },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              className="programming-item"
              variants={skillItemVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true }}
            >
              <i className={`${skill.icon} programming-icon`}></i>
              <span className="programming-name">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Frontend Frameworks */}
      <section className="skills-section skills-frontend mb-5">
        <h2 className="skills-heading mb-4">Frontend Frameworks</h2>
        <div className="frontend-list">
          <motion.div
            className="frontend-card"
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            <div className="frontend-card-inner">
              <div className="frontend-card-front">
                <i className="devicon-android-plain frontend-icon"></i>
                <span className="frontend-name">Android Native</span>
              </div>
              <div className="frontend-card-back">
                <p>Native Android development with Kotlin and Java.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="frontend-card frontend-card-clickable"
            onClick={scrollToFlutterSection}
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <div className="frontend-card-inner">
              <div className="frontend-card-front">
                <i className="devicon-flutter-plain frontend-icon"></i>
                <span className="frontend-name">Flutter</span>
              </div>
              <div className="frontend-card-back">
                <p>Cross-platform app development with Dart.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="frontend-card"
            variants={skillItemVariants}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true }}
          >
            <div className="frontend-card-inner">
              <div className="frontend-card-front">
                <i className="devicon-react-plain frontend-icon"></i>
                <span className="frontend-name">React Native</span>
              </div>
              <div className="frontend-card-back">
                <p>Cross-platform mobile apps with React.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Backend Services */}
      <section className="skills-section skills-backend mb-5">
        <h2 className="skills-heading mb-4">Backend Services</h2>
        <div className="backend-list">
          {[
            { name: "Firebase", icon: "devicon-firebase-plain" },
            { name: "Supabase", icon: "devicon-supabase-plain" },
            { name: "Node.js & Express.js", icon: "devicon-express-original" },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              className="backend-card"
              variants={skillItemVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true }}
            >
              <i className={`${skill.icon} backend-icon`}></i>
              <span className="backend-name">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flutter-Specific Skills */}
      <section
        ref={flutterSectionRef}
        className="skills-section skills-flutter mb-5"
      >
        <h2 className="skills-heading mb-4">Flutter-Specific Skills</h2>

        {/* Tabs */}
        <div className="flutter-tabs mb-4">
          <button
            className={`flutter-tab ${
              activeTab === "stateManagement" ? "active" : ""
            }`}
            onClick={() => setActiveTab("stateManagement")}
          >
            State Management
          </button>
          <button
            className={`flutter-tab ${
              activeTab === "paymentIntegration" ? "active" : ""
            }`}
            onClick={() => setActiveTab("paymentIntegration")}
          >
            Payment Integration
          </button>
          <button
            className={`flutter-tab ${
              activeTab === "databases" ? "active" : ""
            }`}
            onClick={() => setActiveTab("databases")}
          >
            Databases
          </button>
          <button
            className={`flutter-tab ${
              activeTab === "generalSkills" ? "active" : ""
            }`}
            onClick={() => setActiveTab("generalSkills")}
          >
            General Skills
          </button>
        </div>

        {/* Tab Content */}
        <div className="flutter-tab-content">
          <div className="flutter-skills-grid">
            {flutterTabs[activeTab].map((skill, index) => (
              <motion.div
                key={skill}
                className="flutter-skill-card"
                variants={skillItemVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true }}
              >
                <i className="devicon-flutter-plain flutter-skill-icon"></i>
                <span className="flutter-skill-name">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
