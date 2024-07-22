import { useEffect, useRef, useState } from "react";
import Text from "@/utils/textReveal";
import type { CollectionEntry } from "astro:content";
import { UserData } from "@/data/UserData";
import {  motion, useMotionValue, useTransform } from "framer-motion";
import Tag from "../Tag";
import { $eventsAtom } from "@/stores/EventStore";
import { useStore } from "@nanostores/react";


const EventTrending = () => {
    const event = useStore($eventsAtom);
    const sortedEvents = [...event].sort((a, b) => {
        const totalA = a.data.totalLikes + a.data.totalComments;
        const totalB = b.data.totalLikes + b.data.totalComments;

        if (totalA === totalB) {
            return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
        }
        return totalB - totalA;
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <>
            <section className="bg-white w-screen max-w-[1800px] mx-auto h-fit p-5 flex flex-col gap-15 mt-20">
                <div className="flex flex-col justify-center items-center gap-3 px-5">
                    <div className="bg-blue-5/20 w-10rem md:w-12rem p-3 rounded-full md:py-3 md:px-5">
                        <h1 className="text-blue-500 font-medium text-center md:text-lg">
                            Trending Event
                        </h1>
                    </div>
                    <Text
                        input="Join the greats at upcoming events and competitions to connect, learn and innovate."
                        className="font-medium text-center text-xl md:text-3xl"
                        duration={0.03}
                    />
                </div>
                <div
                    ref={scrollContainerRef}
                    className="flex flex-nowrap px-4 py-10 overflow-x-scroll gap-10 cursor-grab no-scrollbar"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {sortedEvents.length === 0 ? (
                        <div className="text-center">No articles to show</div>
                    ) : (
                        sortedEvents.map((event, index) => (
                            <Card
                                key={event.data.eventId}
                                slug={event.slug}
                                userId={event.data.authorId}
                                cover={event.data.cover}
                                title={event.data.title}
                                description={event.data.description}
                                date={new Date(event.data.date)}
                                category={event.data.category}
                            />
                        ))
                    )}
                </div>
            </section >
        </>

    );
};

type CardProps = {
    slug: string;
    userId: string;
    cover: string;
    title: string;
    description: string;
    date: Date;
    category?: string;
};

const Card = ({
    slug,
    userId,
    cover,
    title,
    description,
    date,
    category,
}: CardProps) => {
    const user = UserData.find((user) => user.userId === userId);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [15, -15]);
    const rotateY = useTransform(x, [-50, 50], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const xValue = ((offsetX - centerX) / centerX) * 50;
            const yValue = ((offsetY - centerY) / centerY) * 50;

            x.set(xValue);
            y.set(yValue);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        const cardElement = cardRef.current;
        if (cardElement) {
            cardElement.addEventListener('mousemove', handleMouseMove);
            cardElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (cardElement) {
                cardElement.removeEventListener('mousemove', handleMouseMove);
                cardElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [x, y]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsCardVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [cardRef]);

    return (
        <motion.div
            ref={cardRef}
            className="flex flex-col overflow-hidden rounded-xl shadow-xl relative w-full max-w-[400px] xl:max-w-[600px] h-[500px] xl:h-[600px] flex-shrink-0 perspective-1000"
            style={{ perspective: '1000px' }}
            whileHover={{
                boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.5 },
            }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative h-full w-full bg-gray-900 rounded-xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <motion.img
                    draggable={false}
                    src={`/images/events/${slug}/${cover}`}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        x: x,
                        y: y,
                        rotateX: rotateX,
                        rotateY: rotateY,
                    }}
                />
                <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                    <motion.h1
                        className="font-semibold text-2xl md:text-3xl text-white mb-2 line-clamp-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isCardVisible ? 1 : 0, y: isCardVisible ? 0 : 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                    <p className="text-gray-300 mb-4">by {user?.name}</p>
                    <p className="text-gray-400">{date.toDateString()}</p>
                    <p className="text-gray-300 mt-4 line-clamp-2">{description}</p>
                    <div className="flex items-center">
                        {
                            category && <Tag text={category} className="mt-4 bg-gray-blue" />
                        }
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EventTrending;
