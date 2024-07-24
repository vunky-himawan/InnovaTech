import { useStore } from "@nanostores/react";
import HeroDetail from "../HeroDetail";
import {
  $searchAtom,
  $selectedCategoryAtom,
  setSearch,
  setSelectedCategory,
} from "@/stores/EventStore";

type HeroProps = {
  title: string;
  description: string;
  inspire: string;
  categories?: string[];
  tags?: string[];
};

const Hero = ({ title, description, inspire, categories, tags }: HeroProps) => {
  const search = useStore($searchAtom);
  const selectCategory = useStore($selectedCategoryAtom);

  return (
    <HeroDetail
      title={title}
      description={description}
      inspire={inspire}
      categories={categories}
      tags={tags}
      searchInput={search}
      searchCallback={setSearch}
      selectCategories={selectCategory}
      categoriesCallback={setSelectedCategory}
    />
  );
};

export default Hero;
