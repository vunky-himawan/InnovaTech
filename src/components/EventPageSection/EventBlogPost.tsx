import { useEffect, useRef, useState } from 'react';
import Tabbar from '../Tabbar';
import { UserData } from '@/data/UserData';
import { useSpring } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';
import { motion } from 'framer-motion';
import SearchComponent from '../SearchComponent';
import Tag from '../Tag';
import { $filteredEventsAtom, $searchAtom, $selectedCategoryAtom, setSearch, setSelectedCategory } from '@/stores/EventStore';
import { useStore } from '@nanostores/react';
import Filter from '../Filter';
import moment from 'moment';

type FeaturedEventsProps = {
  categories: string[];
};

const ArticleBlogPost = ({ categories }: FeaturedEventsProps) => {
  const event = useStore($filteredEventsAtom);
  const search = useStore($searchAtom);
  const selectedCategory = useStore($selectedCategoryAtom);
  return (
    <section className="gap-5 max-w-[1800px] w-full mx-auto p-5 my-10">
      <div className="grid grid-cols-3 gap-5 mt-15">
        <div className="col-span-3 xl:col-span-2 gap-5">
          <Tabbar category={categories} selectedCategory={selectedCategory} callback={setSelectedCategory} />
          <div className="grid grid-cols-span-1 xl:grid-cols-2 gap-5 my-5">
            {event.length === 0 ? (
              <div>No events found</div>
            ) : (event.map((event, index) => (
              <Card
                key={event.id}
                slug={event.slug}
                registration={event.data.timeline.registration}
                eventStartDate={event.data.timeline.start}
                timezone={event.data.timeline.timezone}
                title={event.data.title}
                cover={event.data.cover}
                category={event.data.category}
                description={event.data.description}
                totalLikes={event.data.totalLikes}
                totalComments={event.data.totalComments}
                authorId={event.data.authorId}
                colSpan={(index + 1) % 3 === 0 ? 2 : 1} />
            )))}
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 order-first xl:order-last">
          <SearchComponent placeHolder="Search Project" searchInput={search} callback={setSearch} />
          <div className="col-span-3 xl:col-span-1 space-y-20 my-10">
            {categories && <Filter title="Popular Category" list={categories} select={selectedCategory} callback={setSelectedCategory} />}
          </div>
        </div>
      </div>
    </section>
  );
};


type CardProps = {
  title: string;
  registration?: { start: Date; end: Date }[];
  eventStartDate?: Date;
  timezone: string;
  cover: string;
  category: string;
  description: string;
  totalLikes: number;
  totalComments: number;
  authorId: string;
  slug: string;
  colSpan?: 1 | 2;
};

const Card = ({
  title,
  registration,
  eventStartDate,
  timezone,
  cover,
  description,
  category,
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

  const registrationEndDate = registration?.reduce((latestEndDate, period) => {
    const endDate = new Date(period.end);
    return endDate > new Date(latestEndDate) ? endDate : latestEndDate;
  }, new Date(0));


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
    <a href={`/event/${slug}`} className="w-full h-full">
      <motion.div
        ref={cardRef}
        className={`flex flex-col ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'} bg-gray-blue p-5 rounded-xl gap-3 md:gap-5 shadow-lg relative`}
        style={{ scale, rotate }}
        whileHover={{ scale: 1.05, rotate: 4, boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)' }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="font-semibold text-2xl md:text-3xl line-clamp-1">
          {title}
        </h1>
        <p>Published by {user?.name}</p>
        {registrationEndDate && <p className="text-gray-400">Registration ends on {moment(registrationEndDate).zone(timezone).format('DD MMM YYYY')}</p>}
        <div className="relative w-full h-60 md:h-80 2xl:h-96 overflow-hidden rounded-lg">
          <motion.img
            src={`/images/events/${slug}/${cover}`}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            style={{ opacity: isCardVisible ? 1 : 0 }}
          />
        </div>
        <div className="flex justify-between items-center ">
          {eventStartDate && <p className="text-gray-400">Event starts on {moment(eventStartDate).zone(timezone).format('DD MMM YYYY')}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Tag text={category} className='bg-gray-200 xl:text-xl text-sm capitalize' />
        </div>
        <p className="text-gray-400 line-clamp-3 min-h-[4.5em]">{description}</p>
      </motion.div>
    </a>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col bg-gray-blue p-5 rounded-xl gap-3 md:gap-5 shadow-lg animate-pulse">
      <div className="w-full h-60 bg-gray-700 rounded-lg"></div>
      <div className="w-3/4 h-5 bg-gray-700 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
      <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
    </div>
  );
};

export default ArticleBlogPost;
export type EventModel = {
  eventId: string;
  title: string;
  description: string;
  date: Date;
  fee: number;
  location: string;
  cover: string;
  totalLikes: number;
  totalComments: number;
  totalInterested: number;
  category: string;
  authorId: string;
};
