import { useState } from "react";
import Button from "./Button";
import MenuBar from "./MenuBar";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const handleClickMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <>
      <header className="fixed w-screen top-0 left-0 px-5 py-2 z-10 ">
        <div className="flex justify-between items-center text-white max-w-1000px mx-auto backdrop-blur-sm bg-primary/50 rounded-full p-3 md:p-4">
          <div>
            <h1 className="text-white">Innovatech</h1>
          </div>
          <div className="h-5 w-5 bg-secondary blur rounded-full animate-pulse lg:hidden"></div>
          <nav className="max-lg:hidden flex gap-20">
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/events">Events</a>
            <a href="/projects">Projects</a>
            <a href="/communities">Community</a>
          </nav>
          <div className="lg:hidden">
            <Button
              customStyle="w-fit px-4 py-1 rounded-full relative overflow-hidden"
              color="bg-primary text-white before:content-[''] before:w-full before:h-[10rem] before:absolute before:-top-15 before:-left-1 before:bg-[radial-gradient(30%_100%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)] before:-rotate-55"
              buttonOnClick={handleClickMenu}
            >{`${menuIsOpen ? "Close" : "Menu"}`}</Button>
          </div>
          <div className="max-lg:hidden flex gap-3">
            <a href="/login">
              <Button
                border="rounded-full border border-secondary/20"
                color="bg-primary before:content-[''] before:w-full before:h-[10rem] before:absolute before:-top-15 before:-left-1 before:bg-[radial-gradient(30%_100%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)] before:-rotate-55 hover:before:rotate-55 before:duration-300 hover:before:bg-[radial-gradient(40%_100%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)]"
                text="text-sm text-white"
              >
                Login
              </Button>
            </a>
          </div>
        </div>
      </header>

      <MenuBar isOpen={menuIsOpen} />
    </>
  );
};

export default Header;
