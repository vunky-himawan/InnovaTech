import Button from "./Button";

type MenuBarProps = {
  isOpen: boolean;
};

const MenuBar = ({ isOpen }: MenuBarProps) => {
  return (
    <>
      <div
        className={`max-lg:fixed lg:hidden top-0 left-0 w-screen h-screen bg-primary z-9 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } transition duration-300`}
      >
        <div className="pt-20 p-8 text-white flex flex-col justify-between gap-5 h-full">
          <nav className="flex flex-col gap-10 text-2xl font-bold">
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/events">Events</a>
            <a href="/projects">Projects</a>
            <a href="/communities">Community</a>
          </nav>
          <div className="flex flex-col gap-5">
            <a href="/login">
              <Button
                customStyle="w-full px-4 py-3 rounded-md border border-secondary/20 relative overflow-hidden"
                color="bg-primary text-white before:content-[''] before:w-full before:h-[10rem] before:absolute before:-top-15 before:left-0 before:bg-[radial-gradient(50%_20%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)] before:rotate-10"
              >
                Login
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
