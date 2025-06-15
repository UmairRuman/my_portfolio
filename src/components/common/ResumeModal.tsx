import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

interface ResumeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        background: "transparent",
        border: "none",
        padding: 0,
        maxWidth: "500px",
        width: "90%",
        zIndex: 1000,
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 999,
      },
    }}
  >
    <motion.div
      className="resume-modal"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="resume-modal-header">
        <i className="fas fa-file-alt"></i>
        <h2>My Resume</h2>
      </div>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <a
          href="/my_cv.pdf" // Remove 'public/' prefix
          download
          className="btn button-primary resume-modal-button"
        >
          <i className="fas fa-download"></i> Download Resume
        </a>
        <a
          href="/my_cv.pdf" // Remove 'public/' prefix
          target="_blank"
          rel="noopener noreferrer"
          className="btn button-secondary resume-modal-button"
        >
          <i className="fas fa-eye"></i> View Online
        </a>
      </div>
      <button
        onClick={onRequestClose}
        className="btn button-secondary resume-modal-button w-100"
      >
        Close
      </button>
    </motion.div>
  </Modal>
);

export default ResumeModal;
