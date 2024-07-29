import type { CommunityModel } from "@/models/CommunityModel";
import { type CollectionEntry } from "astro:content";

const CommunityList = ({
  data,
}: {
  data: CollectionEntry<"communities">[];
}) => {
  return (
    <>
      <section className="max-w-1800px h-fit mx-auto px-4 sm:px-6 lg:px-8 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {data.map((community) => (
            <Card data={community.data} slug={community.slug} />
          ))}
        </div>
      </section>
    </>
  );
};

const Card = ({ data, slug }: { data: CommunityModel; slug: string }) => {
  return (
    <>
      <a
        href={`/community/${slug}`}
        className="w-20rem h-fit flex flex-col p-8 gap-5 border rounded-2xl bg-white"
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center border h-10rem w-10rem rounded-full">
            <img
              src={`/images/communities/${slug}/${data.cover}`}
              alt=""
              className="object-cover rounded-full w-full h-full"
            />
          </div>
        </div>
        <div className="text-center flex flex-col gap-2">
          <h3 className="font-medium text-xl">{data.name}</h3>
          <p>{data.description}</p>
        </div>
      </a>
    </>
  );
};

export default CommunityList;
