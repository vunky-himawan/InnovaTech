import { useState } from "react";


type FilterProps = {
    title: string;
    list: string[];
    select?: string | string[];
    callback?: any;
};

const Filter = ({ title, list, select, callback }: FilterProps) => {
    const [isSeeAll, setIsSeeAll] = useState(false);

    const handleSelected = (item: string) => {
        let newSelect;
        if (Array.isArray(select)) {
            if (select.includes(item)) {
                newSelect = select.filter((s) => s !== item);
            } else {
                newSelect = [...select, item];
            }
        } else {
            newSelect = select === item ? "" : item;
        }
        if (callback) {
            callback(newSelect);
        }
    };

    const handleClear = () => {
        let newSelect = Array.isArray(select) ? [] : "";
        if (callback) {
            callback(newSelect);
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="font-bold text-2xl">{title}</h1>
                <button onClick={() => setIsSeeAll(!isSeeAll)} className="flex items-center">
                    {isSeeAll ? "See Less" : "See All"} <div className={`i-heroicons:arrow-small-${isSeeAll ? 'left' : 'right'}-solid mx-2`}></div>
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
                {(isSeeAll ? list : list.slice(0, 5)).map((l, index) => (
                    <div
                        key={index}
                        className={`bg-gray-100 py-2 px-4 m-2 rounded-full font-normal cursor-pointer text-sm lg:text-xl ${select?.includes(l) ? "bg-primary text-white" : ""}`}
                        onClick={() => handleSelected(l)}
                    >
                        {l}
                    </div>
                ))}
            </div>
            {
                select && Array.isArray(select) ? select.length > 0 && (
                    <div className="flex justify-end mt-2">
                        <button onClick={handleClear} className="text-primary">Clear</button>
                    </div>
                ) : select && (
                    <div className="flex justify-end mt-2">
                        <button onClick={handleClear} className="text-primary">Clear</button>
                    </div>
                )
            }
        </div>
    );
};


export default Filter;
