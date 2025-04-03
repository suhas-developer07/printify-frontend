import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: { y: -50, opacity: 0 },  // Slide in from top
  animate: { y: 0, opacity: 1 },    // Fade in
  exit: { y: 50, opacity: 0 },      // Slide out to bottom
};

const pageTransition = {
  duration: 0.3,
  ease: "easeOut",
};

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};
// This component uses Framer Motion to animate the page transitions.