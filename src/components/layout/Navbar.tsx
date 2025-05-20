import { NavLink } from "react-router-dom";
import { Navbar as BSNavbar, Nav } from "react-bootstrap";
import { motion } from "framer-motion";

const Navbar = () => (
  <BSNavbar
    bg="dark"
    variant="dark"
    expand="lg"
    sticky="top"
    className="navbar-custom"
  >
    <div className="container">
      <BSNavbar.Brand as={NavLink} to="/">
        <motion.span
          className="navbar-brand-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Umair <span className="navbar-brand-highlight">Ruman</span>
        </motion.span>
      </BSNavbar.Brand>
      <BSNavbar.Toggle
        aria-controls="navbar-nav"
        className="navbar-toggle-custom"
      />
      <BSNavbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? "active" : ""}`
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? "active" : ""}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/experiences"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? "active" : ""}`
            }
          >
            Experiences
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? "active" : ""}`
            }
          >
            Contacts
          </NavLink>
        </Nav>
      </BSNavbar.Collapse>
    </div>
  </BSNavbar>
);

export default Navbar;
