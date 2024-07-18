import type { ArticleModel } from "@/models/ArticleModel";
import type { CollectionEntry } from "astro:content";
import { motion, MotionValue, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { UserData } from "@/data/UserData";
import type { UserModel } from "@/models/UserModel";
import Text from "@/utils/textReveal";

type FeaturedArticlesProps = {
  articles: CollectionEntry<"articles">[];
};

const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <section
        ref={container}
        className="w-screen md:h-300vh max-w-1800px mx-auto mt-20"
      >
        <div className="flex flex-col gap-15 w-full md:sticky md:top-25 md:h-90vh">
          <div className="flex flex-col justify-center items-center gap-3 px-5">
            <div className="bg-blue-5/20 w-10rem md:w-12rem p-3 rounded-full md:py-3 md:px-5">
              <h1 className="text-blue-500 font-medium text-center md:text-lg">
                Featured Articles
              </h1>
            </div>
            <Text
              input="Dive into our expert articles covering the latest trends and
              insights in technology and innovation."
              className="font-medium text-center text-xl md:text-3xl"
              duration={0.03}
            />
          </div>
          <div className="relative h-full">
            <div className="h-full flex flex-col items-center md:relative overflow-hidden max-md:gap-5 max-md:p-5">
              {articles.map((article, index) => {
                const start = index / articles.length;
                const end = start + 1 / articles.length;
                return (
                  <Card
                    key={article.slug}
                    data={article.data}
                    slug={article.slug}
                    scrollYProgress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

type CardProps = {
  data: ArticleModel;
  slug: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
};

const Card = ({ data, slug, scrollYProgress, start, end }: CardProps) => {
  const isMobile: boolean = window.innerWidth < 768;
  const [show, setShow] = useState(start === 0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= start && latest <= end) {
        setShow(true);
        setIsFirstRender(false);
      } else {
        setShow(false);
        setIsFirstRender(latest < start);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  const variants = isMobile
    ? {
        initial: {},
        animate: {},
      }
    : {
        initial: { translateY: "100%" },
        animate: { translateY: show ? "0%" : isFirstRender ? "100%" : "-100%" },
      };

  return (
    <>
      {isMobile ? (
        <Content data={data} slug={slug} />
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ type: "spring", duration: 1, ease: "easeInOut" }}
          className={`md:h-full md:w-full md:flex bg-white md:absolute `}
        >
          <Content data={data} slug={slug} />
        </motion.div>
      )}
    </>
  );
};

type ContentProps = {
  data: ArticleModel;
  slug: string;
};

const Content = ({ data, slug }: ContentProps) => {
  const isMobile: boolean = window.innerWidth < 768;
  const [hasAnimated, setHasAnimated] = useState(false);
  const author: UserModel | undefined = UserData.find(
    (user) => user.userId === data.authorId
  );

  const variants = {
    initial: { opacity: 0, translateY: "100%" },
    animate: { opacity: 1, translateY: "0%" },
    whileInView: { opacity: 1, translateY: "0%" },
  };

  return (
    <>
      <motion.a
        href={`/article/${slug}`}
        initial={isMobile ? "initial" : ""}
        variants={variants}
        animate={isMobile ? (hasAnimated ? "animate" : "initial") : ""}
        onViewportEnter={() => setHasAnimated(true)}
        transition={{ duration: 2, ease: "linear", type: "spring" }}
        style={
          isMobile
            ? { backgroundColor: "rgb(59, 130, 246)" }
            : {
                backgroundImage: `url(/images/articles/${slug}/${data.cover})`,
              }
        }
        className="w-full h-full bg-cover bg-center bg-no-repeat max-md:rounded-3xl max-md:overflow-hidden"
      >
        <div className="h-full md:bg-primary/40 text-white">
          <motion.div
            initial={isMobile ? "" : "initial"}
            variants={variants}
            animate={hasAnimated ? "animate" : "initial"}
            transition={{
              duration: isMobile ? 2 : 1,
              delay: isMobile ? 0.5 : 0,
              ease: "linear",
              type: "spring",
            }}
            // onViewportEnter={() => setHasAnimated(true)}
            className="flex flex-col md:p-3 justify-center items-center h-fit md:h-full gap-5"
          >
            {isMobile && (
              <picture>
                <img src={`/images/articles/${slug}/${data.cover}`} alt="" />
              </picture>
            )}
            <div className="flex flex-col gap-5 p-5 justify-center items-center">
              <h1 className="font-bold text-xl text-center md:text-5xl">
                {data.title}
              </h1>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 justify-between items-center">
                  <picture className="w-7 h-7 overflow-hidden rounded-full">
                    <img
                      src={`/images/${author?.profileImage}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  <p>{author?.name ?? ""}</p>
                </div>
              </div>
              <p className="lg:text-lg text-center">{data.description}</p>
            </div>
          </motion.div>
        </div>
      </motion.a>
    </>
  );
};

export default FeaturedArticles;
