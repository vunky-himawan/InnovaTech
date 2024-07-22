import Button from "../Button";
import Tag from "../Tag";
import { UserData } from "@/data/UserData";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


type CardProps = {
    slug: string;
    userId: string;
    cover: string;
    title: string;
    description: string;
    totalContributors?: number;
    totalLikes?: number;
    totalComments?: number;
    link?: string;
    tags?: string[];
};

const Card = ({ slug, userId, cover, title, description, totalContributors, totalLikes, totalComments, link, tags }: CardProps) => {
    const user = UserData.find((user) => user.userId === userId);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const [isSeeAll, setIsSeeAll] = useState(false);

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

    return (
        <motion.div
            ref={cardRef}
            className="flex flex-col xl:flex-row bg-gray-blue rounded-xl gap-3 md:gap-5 shadow-lg p-5 h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isCardVisible ? 1 : 0, y: isCardVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-full xl:w-1/2 min-h-80 overflow-hidden rounded-lg flex-shrink-0">
                <motion.img
                    draggable={false}
                    src={`/images/projects/${slug}/${cover}`}
                    alt={title}
                    className="rounded-lg w-full h-full object-cover object-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCardVisible ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            <div className="flex flex-col justify-center gap-3 flex-grow">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <div className="i-heroicons:heart-20-solid w-5 h-5 text-red-500"></div>
                            <p className="text-sm md:text-base lg:text-lg">{totalLikes}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="i-heroicons:chat-bubble-left-ellipsis-20-solid w-5 h-5 text-blue-500"></div>
                            <p className="text-sm md:text-base lg:text-lg">{totalComments}</p>
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl line-clamp-2">
                        {title}
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg line-clamp-1 font-normal">{totalContributors} Contributors</p>
                    <div className="flex items-center gap-3">
                        <img
                            draggable={false}
                            src={`/images/${user?.profileImage}`}
                            alt={user?.name}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                        />
                        <p className="text-sm md:text-base lg:text-lg">{user?.name}</p>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base lg:text-lg line-clamp-3">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags && isSeeAll ? tags.map((tag) => (
                        <Tag key={tag} text={tag} className="bg-gray-200 text-xs md:text-sm lg:text-base xl:text-lg" />
                    )) : tags?.slice(0, 3).map((tag) => (
                        <Tag key={tag} text={tag} className="bg-gray-200 text-xs md:text-sm lg:text-base xl:text-lg" />
                    ))}
                    {tags && tags?.length > 3 && (
                        <button onClick={() => setIsSeeAll(!isSeeAll)} className="text-blue-500 text-xs md:text-sm lg:text-base xl:text-lg">
                            {isSeeAll ? "See Less" : "See All"}
                        </button>
                    )}
                </div>
                {link && (
                    <div>
                        <a href={`${link}`}>
                            <Button
                                color="bg-primary text-white before:content-[''] before:w-full before:h-[10rem] before:absolute before:-top-15 before:-left-1 before:bg-[radial-gradient(30%_100%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)] before:-rotate-55"
                                border="rounded-md border border-secondary/50"
                            >
                                View Project
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Card;