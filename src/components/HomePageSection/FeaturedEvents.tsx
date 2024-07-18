import { UserData } from "@/data/UserData";
import type { EventModel } from "@/models/EventModel";
import type { UserModel } from "@/models/UserModel";
import type { CollectionEntry } from "astro:content";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Text from "@/utils/textReveal";
import { useEffect, useRef, useState } from "react";

type FeaturedEventsProps = {
  events: CollectionEntry<"events">[];
};

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const top = useTransform(scrollYProgress, [0, 1], ["8rem", "-40rem"]);

  return (
    <>
      <section
        ref={container}
        className="w-screen max-w-1800px mx-auto p-5 h-500vh mt-20"
      >
        <motion.div
          style={{ top: top }}
          className="flex flex-col gap-15 w-full sticky"
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="bg-blue-5/20 w-10rem md:w-12rem p-3 rounded-full">
              <h1 className="text-blue-500 font-medium text-center">
                Interested Events
              </h1>
            </div>
            <Text
              input="Join the greats at upcoming events and competitions to connect, learn and innovate."
              className="font-medium text-center text-xl md:text-3xl"
              duration={0.05}
            />
          </div>
          <motion.div className="w-full flex">
            <div className="w-full">
              {events.map((e, index) => {
                const start = index / events.length;
                const end = start + 1 / events.length;

                return (
                  <Card
                    key={e.data.eventId}
                    data={e.data}
                    slug={e.slug}
                    start={start}
                    end={end}
                    scrollYProgress={scrollYProgress}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

type CardProps = {
  slug: string;
  data: EventModel;
  start: number;
  end: number;
  scrollYProgress: MotionValue;
};

const Card = ({ slug, data, start, end, scrollYProgress }: CardProps) => {
  const User: UserModel | undefined = UserData.find(
    (u) => u.userId === data.authorId
  );
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("");

  const imageLoading = async () => {
    const promise = new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = `/images/events/${slug}/${data.cover}`;
      img.onload = () => resolve(img.src);
      img.onerror = reject;
    });

    try {
      const imageLoaded = await promise;
      setImage(imageLoaded);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load image", error);
    }
  };

  useEffect(() => {
    if (active) {
      setIsLoading(true);
      setTimeout(() => {
        imageLoading();
      }, 1000);
    }
  }, [active]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= start && latest <= end) {
        setActive(true);
      } else {
        setActive(false);
      }

      if (latest === 0) {
        setActive(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <>
      <motion.div className={`w-full relative bg-white`}>
        <div className="border-b border-primary/10 p-5">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="font-semibold text-2xl">{data.title}</h1>
              <p className="capitalize text-secondary">{data.category}</p>
            </div>
            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                active
                  ? "grid-rows-[1fr] opacity-100 py-5"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden flex flex-col justify-center items-center gap-3 ">
                {isLoading && <Skeleton />}
                {!isLoading && (
                  <>
                    <a
                      href={`/event/${slug}`}
                      className="capitalize lg:p-5 flex justify-center text-blue-5 lg:text-xl"
                    >
                      View {data.category}
                    </a>
                    <picture className="w-full">
                      <img
                        loading="lazy"
                        src={image}
                        alt=""
                        className="lg:max-h-50vh max-md:max-h-10rem md:max-h-20rem w-full object-cover"
                      />
                    </picture>
                    <p className="lg:text-xl text-center">{data.description}</p>
                    <p className="font-bold ">
                      {new Date(data.date).toDateString()}
                    </p>
                    <p>by {User?.name}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Skeleton = () => {
  return (
    <>
      <div className="w-full lg:w-20vw h-20vh bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="w-85% lg:w-15vw h-1rem bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="w-75% lg:w-10vw h-1rem bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="w-65% lg:w-5vw h-1rem bg-gray-200 animate-pulse rounded-lg"></div>
    </>
  );
};

export default FeaturedEvents;
