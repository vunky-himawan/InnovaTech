import { useEffect, useState } from "react";
import Text from "@/utils/textReveal";
import { useStore } from "@nanostores/react";
import { $articlesAtom } from "@/stores/ArticleStore";

const ArtilcleTrending = () => {
  const article = useStore($articlesAtom);
  const sortedArticles = [...article].sort((a, b) => {
    const totalA = a.data.totalLikes + a.data.totalComments;
    const totalB = b.data.totalLikes + b.data.totalComments;

    if (totalA === totalB) {
      return (
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
      );
    }
    return totalB - totalA;
  });

  return (
    <>
      <section className="bg-white w-screen max-w-[1800px] mx-auto h-fit p-5 flex flex-col gap-15 mt-20">
        <div className="flex flex-col justify-center items-center gap-3 px-5">
          <div className="bg-blue-5/20 w-10rem md:w-12rem p-3 rounded-full md:py-3 md:px-5">
            <h1 className="text-blue-500 font-medium text-center md:text-lg">
              Trending Article
            </h1>
          </div>
          <Text
            input="Dive into our expert articles covering the latest trends and insights in technology and innovation."
            className="font-medium text-center text-xl md:text-3xl"
            duration={0.03}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5 mt-15">
          {sortedArticles[0] && (
            <Card
              key={sortedArticles[0].data.articleId}
              slug={sortedArticles[0].slug}
              cover={sortedArticles[0].data.cover}
              title={sortedArticles[0].data.title}
              description={sortedArticles[0].data.description}
              trending={1}
              colspan="lg:col-span-3"
              duration={2000}
            />
          )}
          {sortedArticles.slice(1, 4).map((article, index) => (
            <Card
              key={article.data.articleId}
              slug={article.slug}
              cover={article.data.cover}
              title={article.data.title}
              description={article.data.description}
              trending={index + 1}
              duration={3000 + index * 500}
            />
          ))}
        </div>
      </section>
    </>
  );
};

type CardProps = {
  slug: string;
  cover: string;
  title: string;
  description: string;
  trending?: number;
  colspan?: string;
  duration?: number;
};
const Card = ({
  slug,
  cover,
  title,
  description,
  trending,
  colspan,
  duration,
}: CardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const promise = new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = `/images/articles/${slug}/${cover}`;
        img.onload = () => resolve(img.src);
        img.onerror = reject;
      });

      try {
        const src = await promise;
        setLoadedImage(src);
        setImageLoaded(true);
        setTimeout(() => setIsLoading(false), duration);
      } catch (error) {
        console.error("Failed to load image", error);
      }
    };

    loadImage();
  }, [cover, duration]);

  return (
    <div
      className={`h-[400px] xl:h-[600px] rounded-lg shadow-lg cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 ${colspan}`}
    >
      <a href={`/article/${slug}`} className="block w-full h-full relative">
        {isLoading ? (
          <Skeleton />
        ) : (
          <img
            src={loadedImage || ""}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ease-in-out"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}
        <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
          <h1
            className={`text-4xl font-bold text-white transition-opacity duration-500 line-clamp-1 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-white text-lg font-semibold transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            Trending #{trending}
          </p>
          <p
            className={`text-lg text-white transition-opacity duration-500 line-clamp-2 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            {description}
          </p>
        </div>
      </a>
    </div>
  );
};

const Skeleton = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="bg-gray-200 h-4 w-48 mt-4 rounded animate-pulse" />
        <div className="bg-gray-300 h-4 w-48 mt-4 rounded animate-pulse" />
      </div>
    </>
  );
};

export default ArtilcleTrending;
