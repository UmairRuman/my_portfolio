import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar as BSNavbar, Nav } from "react-bootstrap";
import { motion } from "framer-motion";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  return (
    <BSNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="navbar-custom"
      expanded={expanded}
    >
      <div className="container">
        <BSNavbar.Brand as={NavLink} to="/" onClick={handleNavClick}>
          <motion.span
            className="navbar-brand-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Umair <span className="navbar-brand-highlight">Ruman</span>
          </motion.span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle
          aria-controls="navbar-nav"
          className="navbar-toggle-custom"
          onClick={() => setExpanded((prev) => !prev)}
        />
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {["/", "/skills", "/projects", "/experiences", "/contacts"].map(
              (path, idx) => {
                const label = [
                  "Home",
                  "Skills",
                  "Projects",
                  "Experiences",
                  "Contacts",
                ][idx];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `nav-link-custom ${isActive ? "active" : ""}`
                    }
                    onClick={handleNavClick}
                  >
                    {label}
                  </NavLink>
                );
              }
            )}
          </Nav>
        </BSNavbar.Collapse>
      </div>
    </BSNavbar>
  );
};

export default Navbar;
