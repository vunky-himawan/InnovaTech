import { FEATURES } from "@/data/FeatureData";
import type { FeatureModel } from "@/models/FeatureModel";
import Background from "../Background";
import { motion } from "framer-motion";
import { useState } from "react";
import Text from "@/utils/textReveal";

const Feature = () => {
  const DEFAULT_FEATURES: FeatureModel[] = FEATURES;

  return (
    <>
      <section className="w-screen max-w-1800px mx-auto h-fit bg-white p-5 mt-20">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="bg-blue-5/20 w-10rem md:w-12rem p-3 rounded-full md:py-3 md:px-5">
            <h1 className="text-blue-500 font-medium text-center md:text-lg">
              Feature
            </h1>
          </div>
          <Text
            input="What You'll Find on Innovatech"
            className="font-medium text-center text-xl md:text-3xl"
            duration={0.05}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5 mt-15">
          {DEFAULT_FEATURES.map((feature, index) => (
            <Card
              key={feature.featureId}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              colspan={
                index === 0 || index === FEATURES.length - 1
                  ? "lg:col-span-2"
                  : ""
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};

type CardProps = {
  image: string;
  title: string;
  description: string;
  colspan?: string;
};

const Card = ({ image, title, description, colspan }: CardProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <>
      <motion.div
        initial={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 0%)",
        }}
        whileInView={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%)",
        }}
        transition={{ duration: 1, delay: 0.3, staggerChildren: 0.5 }}
        onViewportEnter={() => setHasAnimated(true)}
        animate={
          hasAnimated
            ? {
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%)",
              }
            : {}
        }
        className={`p-5 md:p-10 bg-primary text-white rounded-xl flex flex-col justify-between items-center gap-3 relative overflow-hidden sm:max-lg:landscape:flex-row ${colspan}`}
      >
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute -top-20 -left-20 w-[15rem] h-[15rem] bg-blue-500/50 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-[15rem] h-[15rem] bg-blue-500/50 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex-1 flex flex-col gap-5 order-2"
        >
          <h1 className="text-3xl md:text-4xl font-semibold w-full relative z-2">
            {title}
          </h1>
          <p className="relative z-2 md:text-lg">{description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className={`relative z-2 rounded-full overflow-hidden p-5`}
        >
          <Background />
          <img src={`/images/${image}`} alt="" />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Feature;
