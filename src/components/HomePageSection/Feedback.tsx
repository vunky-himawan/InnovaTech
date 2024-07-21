import { FeedbackData } from "@/data/FeedbackData";
import type { FeedbackModel } from "@/models/FeedbackModel";
import {
  useScroll,
  motion,
  useTransform,
  MotionValue,
  useAnimation,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Background from "../Background";

const Feedback = () => {
  const feedbacks: FeedbackModel[] = FeedbackData;
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 0.5], ["50vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["50vh", "100vh"]);
  const top = useTransform(scrollYProgress, [0, 0.5], ["25%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    ["5rem", "0rem"]
  );

  return (
    <>
      <section
        ref={container}
        className="h-300vh flex justify-center mt-20 relative"
      >
        <motion.div
          style={{ width, height, top, borderRadius }}
          className="sticky top-25% overflow-hidden relative bg-primary"
        >
          <Light />
          <Background />
          <motion.div
            style={{ opacity }}
            className="w-full h-full max-md:rotate-90 flex justify-center items-center bg-[radial-gradient(circle,_rgba(0,_0,_0,_0)_50%,_rgba(0,_0,_0,_1)_100%)] absolute top-0 left-0"
          >
            <h1 className="text-white font-bold text-6xl 2xl:text-10rem">
              Reviews
            </h1>
          </motion.div>
          <div className="grid grid-cols-1 grid-rows-4 text-white gap-5 relative min-h-full max-h-fit overflow-hidden">
            <div className="flex w-fit gap-5 h-full">
              <Slide
                data={feedbacks.slice(0, 5)}
                scrollYProgress={scrollYProgress}
                direction="left"
              />
              <Slide
                data={feedbacks.slice(0, 5)}
                scrollYProgress={scrollYProgress}
                direction="left"
              />
            </div>
            <div className="flex w-fit gap-5 h-full">
              <Slide
                data={feedbacks.slice(5, 10)}
                scrollYProgress={scrollYProgress}
                direction="right"
              />
              <Slide
                data={feedbacks.slice(5, 10)}
                scrollYProgress={scrollYProgress}
                direction="right"
              />
            </div>
            <div className="flex w-fit gap-5 h-full">
              <Slide
                data={feedbacks.slice(10, 15)}
                scrollYProgress={scrollYProgress}
                direction="left"
              />
              <Slide
                data={feedbacks.slice(10, 15)}
                scrollYProgress={scrollYProgress}
                direction="left"
              />
            </div>
            <div className="flex w-fit gap-5 h-full ">
              <Slide
                data={feedbacks.slice(15, 20)}
                scrollYProgress={scrollYProgress}
                direction="right"
              />
              <Slide
                data={feedbacks.slice(15, 20)}
                scrollYProgress={scrollYProgress}
                direction="right"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

type SlideProps = {
  data: FeedbackModel[];
  scrollYProgress: MotionValue;
  direction: "left" | "right";
};

const Slide = ({ data, scrollYProgress, direction }: SlideProps) => {
  const [isShowed, setIsShowed] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    scrollYProgress.on("change", (latest) => {
      if (latest >= 0.5) {
        setIsShowed(true);
      } else {
        setIsShowed(false);
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (isShowed) {
      controls
        .start({
          translateX: direction === "left" ? "-100%" : "0%",
          transition: { duration: 5, ease: "easeOut" },
        })
        .then(() => {
          controls.start({
            translateX: direction === "left" ? "0%" : "-100%",
            transition: { duration: 60, repeat: Infinity, ease: "linear" },
          });
        });
    } else {
      controls.start({
        translateX: "-300%",
        transition: { duration: 5 },
      });
    }
  }, [isShowed, controls]);

  return (
    <>
      <motion.div
        initial={{ translateX: "-300%" }}
        animate={controls}
        className="grid grid-cols-5 grid-rows-1 w-max gap-5 h-full"
      >
        {data.map((feedback) => (
          <Card key={feedback.id} data={feedback} />
        ))}
      </motion.div>
    </>
  );
};

type CardProps = {
  data: FeedbackModel;
};

const Card = ({ data }: CardProps) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex flex-col cursor-pointer bg-primary/20 backdrop-blur gap-5 p-10 w-30rem h-full border border-gray-blue/40 rounded-3xl"
      >
        <div>
          <h1 className="text-gray-4 font-bold text-2xl">{data.name}</h1>
          <p className="text-gray-4">{data.createdAt.toDateString()}</p>
        </div>
        <p className="text-lg md:text-2xl">{data.message}</p>
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
        className="w-full h-70% -top-0 blur-3xl absolute rounded-full"
      />
    </>
  );
};
export default Feedback;
