import { useRef, useState } from "react";

type TabbarProps = {
    category: string[];
    selectedCategory?: string;
    callback?: (category: string) => void;
};

const Tabbar = ({ category, selectedCategory = "", callback }: TabbarProps) => {
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

    const handleClickTab = (item: string) => {
        if (callback) {
            callback(item);
        }
    };

    return (
        <div
            className="cursor-grab active:cursor-grabbing overflow-x-scroll no-scrollbar"
            style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className="flex flex-nowrap">
                {/* all */}
                <button
                    className={`px-4 py-4 mx-4 min-w-max font-medium ${selectedCategory === "" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
                    onClick={() => handleClickTab("")}
                >
                    All
                </button>

                {category.map((item, index) => (
                    <button
                        key={index}
                        className={`px-4 py-4 mx-4 min-w-max font-medium capitalize ${selectedCategory === item ? "border-b-2 border-black text-black" : "text-gray-500"}`}
                        onClick={() => handleClickTab(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabbar;
