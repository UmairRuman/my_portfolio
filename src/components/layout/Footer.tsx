// src/components/layout/Footer.tsx
const Footer = () => (
  <footer className="bg-dark text-white text-center py-3">
    <div className="container">
      <p>&copy; {new Date().getFullYear()} Your Name. All Rights Reserved.</p>
      <div>
        <a href="https://github.com/yourusername" className="text-white mx-2">
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          className="text-white mx-2"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
