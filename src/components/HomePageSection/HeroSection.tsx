import Background from "../Background";
import Button from "../Button";
import Text from "@/utils/textReveal";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <section className="h-fit relative bg-primary overflow-hidden">
        <Light />
        <Background />
        <div className="w-screen max-w-1800px mx-auto h-screen sm:max-lg:landscape:h-[200vh] relative text-white flex flex-col justify-center items-center gap-5 p-5 overflow-hidden">
          <div className="flex justify-center items-center">
            <Rules />
          </div>
          <Text
            input="Join the Open Source Movement"
            duration={0.05}
            className={`text-center max-md:text-4xl 2xl:text-5rem font-cabinet md:text-6xl font-bold relative z-2 overflow-hidden`}
          />
          <Text
            input="Contribute to and learn from the vibrant open-source community. Our curated articles and project highlights keep you informed and engaged with the latest trends and opportunities in open source."
            duration={0.02}
            className="text-center relative z-2 md:text-lg 2xl:text-2xl xl:max-w-3xl"
          />
          <a href="" className="flex items-center justify-center">
            <Button
              color="bg-primary before:content-[''] before:w-full before:h-10rem 2xl:before:h-20vh 2xl:before:-top-25 before:absolute  before:-top-15 before:-left-1 before:bg-[radial-gradient(30%_100%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)] before:-rotate-55"
              border="rounded-md border border-secondary/50"
            >
              Contribute Now
            </Button>
          </a>
        </div>
      </section>
    </>
  );
};

const Rules = () => {
  return (
    <>
      <div className="flex max-lg:flex-col justify-center items-center">
        <Square>
          <div className="i-heroicons:book-open-20-solid w-5 h-5 2xl:w-2rem 2xl:h-2rem"></div>
          Reading
        </Square>
        <div className="max-lg:h-[3rem] max-lg:w-fit lg:w-[5rem] lg:h-fit border-secondary max-lg:border-l lg:border-b border-dashed  shadow-[0px_0px_2.8px_0px_#05CD77]" />
        <Square>
          <div className="i-heroicons-solid:light-bulb w-5 h-5 2xl:w-2rem 2xl:h-2rem"></div>
          Get Insight
        </Square>
        <div className="max-lg:h-[3rem] max-lg:w-fit lg:w-[5rem] lg:h-[0px] border-secondary max-lg:border-l lg:border-b border-dashed  shadow-[0px_0px_2.8px_0px_#05CD77]" />
        <Square>
          <div className="i-heroicons:code-bracket-20-solid w-5 h-5 2xl:w-2rem 2xl:h-2rem"></div>
          Contribute or Create Project
        </Square>
      </div>
    </>
  );
};

type SquareProps = {
  children: React.ReactNode;
};

const Square = ({ children }: SquareProps) => {
  return (
    <>
      <motion.div
        initial={{
          backgroundImage:
            "linear-gradient(to right, rgba(20, 22, 20, 0.9) 20%, rgba(20, 22, 20, 0.9) 20%), linear-gradient(0deg, #05CD77 10%, #141614 100%)",
        }}
        animate={{
          backgroundImage:
            "linear-gradient(to right, rgba(20, 22, 20, 0.9) 20%, rgba(20, 22, 20, 0.9) 20%), linear-gradient(360deg, #05CD77 10%, #141614 100%)",
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        style={{
          border: "2px solid transparent",
          borderRadius: "0.5rem",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
          padding: "0.5rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="text-secondary text-center relative z-2 gap-2 2xl:gap-5 2xl:text-2rem"
      >
        {children}
      </motion.div>
    </>
  );
};

const Light = () => {
  return (
    <>
      <motion.div
        initial={{
          backgroundImage:
            "radial-gradient(50% 50% at 40% 40%, #141614 100%, #05CD77 100%)",
        }}
        animate={{
          backgroundImage:
            "radial-gradient(50% 50% at 45% 45%, #141614 100%, #05CD77 100%)",
        }}
        transition={{
          type: "spring",
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeOut",
        }}
        className="w-full h-full -top-0 blur-3xl absolute rounded-full"
      />
    </>
  );
};

export default Hero;
