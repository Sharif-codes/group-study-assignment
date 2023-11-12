import { motion } from "framer-motion";

const AnimatedButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        border: "none",
        outline: "none",
      }}
    >
      
    </motion.button>
  );
};

export default AnimatedButton;
