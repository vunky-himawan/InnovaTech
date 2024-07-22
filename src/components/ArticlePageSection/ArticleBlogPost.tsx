import { useEffect, useRef, useState } from 'react';
import Tabbar from '../Tabbar';
import { UserData } from '@/data/UserData';
import { useSpring } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';
import { motion } from 'framer-motion';
import Filter from '../Filter';
import SearchComponent from '../SearchComponent';

type FeaturedArticlesProps = {
  articles: CollectionEntry<"articles">[];
  category: string[];
  tags?: string[];
};

const ArticleBlogPost = ({ articles, category, tags }: FeaturedArticlesProps) => {
  const [filteredArticles, setFilteredArticles] = useState<CollectionEntry<"articles">[]>(articles);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTopicChange = (selected: string) => {
    setSelectedCategory(selected);
  };

  const handleTagChange = (selected: string[]) => {
    setSelectedTags(selected);
  };

  useEffect(() => {
    let result = articles;

    if (search) {
      result = result.filter((article) =>
        article.data.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((article) =>
        Array.isArray(selectedCategory)
          ? selectedCategory.includes(article.data.category)
          : article.data.category === selectedCategory
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((article) =>
        selectedTags.every(tag => article.data.tags?.includes(tag))
      );
    }

    setFilteredArticles(result);
  }, [search, selectedCategory, selectedTags]);


  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  return (
    <section className="gap-5 max-w-[1800px] w-screen mx-auto p-5 my-10 ">
      <div className="grid grid-cols-3 gap-5 mt-15">
        <div className="col-span-3 xl:col-span-2 gap-5">
          <Tabbar category={category} selectedCategory={selectedCategory} callback={setSelectedCategory} />
          <div className="grid grid-cols-span-1 xl:grid-cols-2 gap-5 my-5">
            {filteredArticles.length === 0 ? (
              <div>No articles found</div>
            ) : (filteredArticles.map((article, index) => (
              <Card key={article.id} title={article.data.title} pubDate={article.data.pubDate} cover={article.data.cover} description={article.data.description} totalLikes={article.data.totalLikes} totalComments={article.data.totalComments} authorId={article.data.authorId} slug={article.slug} colSpan={(index + 1) % 3 === 0 ? 2 : 1} />
            )))}
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 order-first xl:order-last">
          <SearchComponent placeHolder="Search Article" searchInput={search} callback={setSearch} />
          <div className="col-span-3 xl:col-span-1 space-y-20 my-10">
            {tags && <Filter title="Popular Tags" list={tags} select={[]} callback={handleTagChange} />}
            {/* {category && <Filter title="Popular Category" list={category} select={""} callback={handleTopicChange} />} */}
          </div>
        </div>
      </div>
    </section>
  );
};

type CardProps = {
  title: string;
  pubDate?: Date;
  cover: string;
  description: string;
  totalLikes: number;
  totalComments: number;
  authorId: string;
  slug: string;
  colSpan?: 1 | 2;
};

const Card = ({
  title,
  pubDate,
  cover,
  description,
  totalLikes,
  totalComments,
  authorId,
  slug,
  colSpan = 1,
}: CardProps) => {
  const user = UserData.find((user) => user.userId === authorId);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const scale = useSpring(1, { stiffness: 200, damping: 50 });
  const rotate = useSpring(0, { stiffness: 200, damping: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isCardVisible) {
      scale.set(1);
      rotate.set(0);
    }
  }, [isCardVisible, scale, rotate]);

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'} bg-gray-blue p-5 rounded-xl gap-3 md:gap-5 shadow-lg relative`}
      style={{ scale, rotate }}
      whileHover={{ scale: 1.05, rotate: 4, boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-semibold text-2xl md:text-3xl line-clamp-2">
        {title}
      </h1>
      {pubDate && <p className="text-gray-400">{pubDate.toDateString()}</p>}
      <div className="relative w-full h-60 md:h-80 2xl:h-96 overflow-hidden rounded-lg">
        <motion.img
          src={`/images/articles/${slug}/${cover}`}
          alt=""
          className="rounded-lg w-full h-full object-cover object-center transition-opacity duration-500"
          style={{ opacity: isCardVisible ? 1 : 0 }}
        />
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <img
            src={`/images/${user?.profileImage}`}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <p>{user?.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="i-heroicons:heart-20-solid w-5 h-5 text-red-500"></div>
            <p>{totalLikes}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="i-heroicons:chat-bubble-left-ellipsis-20-solid w-5 h-5 text-blue-500"></div>
            <p>{totalComments}</p>
          </div>
        </div>
      </div>
      <p className="text-gray-400 line-clamp-3">{description}</p>
    </motion.div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col bg-gray-800 p-5 rounded-xl gap-3 md:gap-5 shadow-lg animate-pulse">
      <div className="w-full h-60 bg-gray-700 rounded-lg"></div>
      <div className="w-3/4 h-5 bg-gray-700 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
      <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
    </div>
  );
};
export default ArticleBlogPost;
