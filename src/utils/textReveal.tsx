import { motion } from "framer-motion";
import splitString from "./splitString";
import { useState } from "react";

type TextProps = {
  duration: number;
  input: string;
  className?: string;
};

const Text = ({ input, duration, className }: TextProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const text = splitString(input);
  const textVarians = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <>
      <motion.p
        initial="hidden"
        animate={hasAnimated ? "reveal" : "hidden"}
        transition={{ staggerChildren: duration }}
        onViewportEnter={() => setHasAnimated(true)}
        className={className}
      >
        {text.map((char, index) => (
          <motion.span
            key={`index-${index}`}
            variants={textVarians}
            transition={{ duration: duration }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </>
  );
};

export default Text;
