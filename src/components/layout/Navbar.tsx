import { NavLink } from "react-router-dom";
import { Navbar as BSNavbar, Nav } from "react-bootstrap";

const Navbar = () => (
  <BSNavbar bg="dark" variant="dark" expand="lg" sticky="top">
    <div className="container">
      <BSNavbar.Brand as={NavLink} to="/">
        Innovaters
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="navbar-nav" />
      <BSNavbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Skills
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Projects
          </NavLink>
          <NavLink
            to="/experiences"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Experiences
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Contacts
          </NavLink>
        </Nav>
      </BSNavbar.Collapse>
    </div>
  </BSNavbar>
);

export default Navbar;
