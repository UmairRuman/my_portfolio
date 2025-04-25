import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  text,
  to,
  onClick,
  variant = "primary",
}) => {
  const className =
    variant === "primary" ? "button-primary" : "button-secondary";
  const iconClass = text === "Hire Me" ? "fas fa-briefcase" : "fas fa-download";

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  if (to) {
    return (
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Link to={to} className={className} onClick={onClick}>
          <i className={iconClass}></i>
          {text}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className={className}
      onClick={onClick}
    >
      <i className={iconClass}></i>
      {text}
    </motion.button>
  );
};

export default Button;
