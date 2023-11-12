import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "5px solid #4CAF50",
          borderTop: "5px solid transparent",
        }}
      ></motion.div>
    </div>
  );
};

export default LoadingAnimation;