const Tag = ({ text, className }: {
    text: string,
    className?: string
}) => {
    return (
        <div
            className={`py-2 px-4 ${className} bg-gray-100 text-black rounded-full font-normal `}
        >
            {text}
        </div>
    );
}

export default Tag;