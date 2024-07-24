import { useState } from "react";

type SearchProps = {
    searchInput?: string ;
    placeHolder?: string;
    className?: string;
    callback? : (search: string) => void;
}
const SearchComponent = ({ searchInput = "", placeHolder = 'Search', className, callback }: SearchProps) => {

    return (
        <div className={`flex justify-between items-center ${className} border border-gray-200 rounded-full px-4 py-1  font-normal`}>
            <input
                type="text"
                placeholder={placeHolder}
                value={searchInput}
                className="w-full px-2 py-2 outline-none focus:outline-none text-md md:text-xl bg-transparent"
                onChange={(e) => {
                    if (callback) {
                        callback(e.target.value);
                    }
                }}
                
            />
            <div className="i-heroicons:magnifying-glass-20-solid w-6 h-6 2xl:w-2rem"></div>
        </div>
    );
}

export default SearchComponent;