import { useState } from "react";

type FilterProps = {
    title: string;
    list: string[];
    select?: string | string[];
    callback?: any;
};

const Filter = ({ title, list, select, callback }: FilterProps) => {
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [selected, setSelected] = useState(
        Array.isArray(select) ? select : select ? [select] : ""
    );


    const handleSelected = (item: string) => {
        setSelected(prevSelected => {
            let newSelected;
            if (Array.isArray(prevSelected)) {
                newSelected = prevSelected.includes(item)
                    ? prevSelected.filter((s) => s !== item)
                    : [...prevSelected, item];
            } else {
                newSelected = prevSelected === item ? "" : item;
            }

            if (callback) {
                callback(newSelected);
            }

            return newSelected;
        });
    };

    const handleClear = () => {
        setSelected(prevSelected => {
            let newSelected;
            if (Array.isArray(prevSelected)) {
                newSelected = [];
            } else {
                newSelected = "";
            }

            if (callback) {
                callback(newSelected);
            }

            return newSelected;
        });
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
                        className={`bg-gray-100 py-2 px-4 m-2 rounded-full font-normal text-sm lg:text-xl ${selected.includes(l) ? "bg-primary text-white" : ""
                            }`}
                        onClick={() => handleSelected(l)}
                    >
                        {l}
                    </div>
                ))}
            </div>
            {
                selected.length > 0 && (
                    <div className="flex justify-end mt-2">
                        <button onClick={handleClear} className="text-primary">Clear</button>
                    </div>
                )
            }
        </div>
    );
};

export default Filter;
