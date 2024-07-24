import Background from "./Background";
import Text from "@/utils/textReveal";
import { motion } from "framer-motion";
import SearchComponent from "./SearchComponent";

type HeroDetailProps = {
  title: string;
  description: string;
  inspire: string;
  categories?: string[];
  tags?: string[];
  searchInput?: string;
  placeHolder?: string;
  searchCallback?: (search: string) => void;
  selectTags?: string[];
  tagsCallback?: (tag: string[]) => void;
  selectCategories?: string | string[];
  categoriesCallback?: (category: string) => void;
};

const HeroDetail = ({ title, description, inspire, categories, tags, searchInput, placeHolder, searchCallback, selectTags, tagsCallback, selectCategories, categoriesCallback }: HeroDetailProps) => {

  const handleTagClick = (tag: string) => {
    let updatedTags;
    if (selectTags?.includes(tag)) {
      updatedTags = selectTags?.filter(t => t !== tag);
    } else {
      updatedTags = [...(selectTags || []), tag];
    }
    if (tagsCallback) {
      tagsCallback(updatedTags);
    }
  }

  const handleCategoryClick = (category: string) => {
    if (categoriesCallback) {
      categoriesCallback(category);
    }
  }
  const maximumTags = 20;
  const totalTags = tags?.length ?? 0;
  const totalCategories = categories?.length ?? 0;
  const totalList = totalTags + totalCategories;

  if (totalList > maximumTags) {
    if (totalTags > totalCategories) {
      tags = tags?.slice(0, maximumTags - totalCategories);
    } else {
      categories = categories?.slice(0, maximumTags - totalTags);
    }
  }

  
  return (
    <>
      <section className="h-fit relative bg-primary overflow-hidden">
        <Light />
        <Background />
        <div className="w-screen max-w-1800px mx-auto h-screen sm:max-lg:landscape:h-[200vh] relative text-white flex flex-col justify-center items-center md:gap-12 gap-6 p-5 overflow-hidden">
          <div className="flex justify-center items-center">
            <Inspire inspire={inspire} />
          </div>
          <Text
            input={title}
            duration={0.05}
            className={`text-center max-md:text-4xl 2xl:text-5rem font-cabinet md:text-6xl font-bold relative z-2 overflow-hidden`}
          />
          <Text
            input={description}
            duration={0.02}
            className="text-center relative z-2 md:text-lg 2xl:text-2xl xl:max-w-3xl"
          />
          <SearchComponent searchInput={searchInput} callback={searchCallback} placeHolder="Search Keyword" className="max-w-2xl w-full bg-primary border-secondary/50 text-seccondary" />
          <div className="flex flex-wrap gap-2 justify-center items-center mt-5 capitalize">
            {categories && categories.map((category, index) => (
              <div key={index} className={`bg-white/10 rounded-full cursor-pointer text-secondary py-2 px-6 md:text-xl text-md ${selectCategories?.includes(category) ? "bg-primary text-white" : ""}`} onClick={() => handleCategoryClick(category)}>
                {category}
              </div>

            ))}
            {tags && tags.map((tag, index) => (
              <div key={index} className={`bg-white/10 rounded-full cursor-pointer text-secondary py-2 px-6 md:text-xl text-md ${selectTags?.includes(tag) ? "bg-primary text-white" : ""}`} onClick={() => handleTagClick(tag)}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Inspire = ({ inspire }: { inspire: string }) => {
  return (
    <>
      <div className="flex max-lg:flex-col justify-center items-center">
        <Square>
          <div className="i-heroicons-solid:light-bulb w-5 h-5 2xl:w-2rem 2xl:h-2rem"></div>
          <span className="text-md">
            {inspire}
          </span>
        </Square>
      </div>
    </>
  );
}


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

export default HeroDetail;
