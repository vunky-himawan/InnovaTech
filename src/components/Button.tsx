type ButtonProps = {
  children: React.ReactNode;
  buttonOnClick?: () => void;
  color?: string;
  customStyle?: string;
  border?: string;
  text?: string;
};

const Button = ({
  children,
  buttonOnClick,
  color,
  customStyle,
  border,
  text,
}: ButtonProps) => {
  return (
    <>
      <button
        className={`${
          customStyle
            ? customStyle
            : `min-w-[8rem] relative px-5 py-2 overflow-hidden 2xl:px-10 2xl:py-3`
        } ${color} ${border} ${text}`}
        onClick={buttonOnClick}
      >
        <h1 className="relative z-1">{children}</h1>
      </button>
    </>
  );
};

export default Button;
