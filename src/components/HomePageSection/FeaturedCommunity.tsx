import type { CommunityModel } from "@/models/CommunityModel";
import type { CollectionEntry } from "astro:content";
import { motion } from "framer-motion";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";

type FeaturedCommunityProps = {
  communities: CollectionEntry<"communities">[];
};

const FeaturedCommunity = ({ communities }: FeaturedCommunityProps) => {
  const [width, setWidth] = useState<number>(0);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slider.current) {
      setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
    }
  }, []);

  return (
    <>
      <section>
        <div className="w-screen flex flex-col overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-3 px-5">
            <div className="bg-blue-5/20 w-max p-3 rounded-full">
              <h1 className="text-blue-500 font-medium text-center">
                Community Hightlights
              </h1>
            </div>
            <p className="font-semibold text-center text-xl">
              Get to know the vibrant communities that are driving innovation
              and collaboration in technology.
            </p>
            <Button
              color="bg-primary text-white"
              border="rounded-full border border-secondary"
            >
              <div className="flex gap-3 justify-center items-center">
                See more{" "}
                <div className="i-heroicons:arrow-up-right-solid w-1em h-1em"></div>
              </div>
            </Button>
          </div>
          <motion.div ref={slider} className="overflow-auto no-scrollbar">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="w-max flex gap-5 p-5 cursor-pointer"
            >
              {communities.map((community) => (
                <Card
                  key={community.data.communityId}
                  data={community.data}
                  slug={community.slug}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

type CardProps = {
  data: CommunityModel;
  slug: string;
};

const Card = ({ data, slug }: CardProps) => {
  return (
    <>
      <div className="flex flex-col gap-5 w-85vw justify-center items-center p-2 h-24rem bg-white">
        <picture
          draggable="false"
          className="rounded-3xl overflow-hidden w-full h-60%"
        >
          <img
            draggable="false"
            src={`/images/communities/${slug}/${data.cover}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="h-40% flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <p>{data.totalMembers.toLocaleString()} Members</p>
          <p>{data.description}</p>
        </div>
      </div>
    </>
  );
};

export default FeaturedCommunity;
