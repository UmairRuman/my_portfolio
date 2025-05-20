import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer className="footer py-5">
    <div className="container text-center">
      {/* Branding */}
      <div className="footer-brand mb-4">
        <h3>Umair Ruman</h3>
        <p className="footer-tagline">Software Developer | Innovator</p>
      </div>

      {/* Navigation Links */}

      {/* Divider */}

      {/* Copyright */}
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Umair Ruman. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
