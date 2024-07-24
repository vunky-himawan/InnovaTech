import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const TEXT: string =
    "We provide a platform to find open source projects, tech articles, as well as event information and tech communities. Our mission is to build a collaborative and inclusive tech ecosystem. Join us and create innovation together!";
  const TEXT_WITH_COLOR: string[] = [
    "open",
    "source",
    "projects,",
    "tech",
    "articles,",
    "event",
    "information",
    "tech",
    "communities.",
    "collaborative",
    "inclusive",
    "tech",
    "ecosystem.",
    "innovation",
  ];

  const TEXT_SPLIT: string[] = TEXT.split(" ");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <section>
        <div ref={container} className="gap-5 h-300vh max-w-1800px mx-auto p-5">
          <div className="h-screen flex justify-center items-center sticky top-0">
            <div className="flex flex-wrap line-height-none justify-center items-center text-3xl lg:text-5xl">
              {TEXT_SPLIT.map((char, index) => {
                const start = index / TEXT_SPLIT.length;
                const end = start + 1 / TEXT_SPLIT.length;

                const opacity = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0, 1]
                );

                return (
                  <span
                    key={`key-${index + 1}`}
                    className={`relative mr-2 mt-2 2xl:mr-2rem ${
                      TEXT_WITH_COLOR.includes(char)
                        ? "text-secondary font-bold 2xl:text-5rem"
                        : "2xl:text-5rem"
                    }`}
                  >
                    {char !== " " ? (
                      <span className="opacity-50 absolute">{char}</span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                    {char !== " " ? (
                      <motion.span style={{ opacity }}>{char}</motion.span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
