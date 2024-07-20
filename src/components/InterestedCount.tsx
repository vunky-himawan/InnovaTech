import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";

export const InterestedCountButton = () => {
  const [interested, setInterested] = useState(false);

  const handleClick = () => {
    setInterested(!interested);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {interested ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1.5, 1] }}
            transition={{ duration: 0.2, type: "spring" }}
            onClick={handleClick}
            className="i-ri:heart-fill w-7 h-7 text-red-500 bg-red-500"
          ></motion.button>
        ) : (
          <motion.button
            onClick={handleClick}
            className="i-ri:heart-line w-7 h-7 text-red-500 bg-red-500"
          ></motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
