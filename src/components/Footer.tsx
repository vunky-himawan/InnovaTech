const Footer = () => {
  return (
    <>
      <footer className="bg-white flex flex-col justify-center gap-5 p-5 w-screen lg:min-h-40vh max-w-7xl mx-auto lg:gap-10">
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          <div>
            <h1 className="font-cabinet font-bold text-5xl">InnovaTech</h1>
            <div className="grid grid-cols-1 gap-3">
              <p className="font-semibold text-xl">Follow us on</p>
              <div className="flex gap-3">
                <div className="rounded-full bg-secondary/20 p-2">
                  <div className="i-ri:twitter-x-line w-5 h-5"></div>
                </div>
                <div className="rounded-full bg-secondary/20 p-2">
                  <div className="i-ri:instagram-line w-5 h-5"></div>
                </div>
                <div className="rounded-full bg-secondary/20 p-2">
                  <div className="i-ri:linkedin-line w-5 h-5"></div>
                </div>
                <div className="rounded-full bg-secondary/20 p-2">
                  <div className="i-ri:facebook-line w-5 h-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <h1 className="font-semibold text-lg">Pages</h1>
              <nav className="mt-2">
                <ul>
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/articles" className="hover:underline">
                      Articles
                    </a>
                  </li>
                  <li>
                    <a href="/communities" className="hover:underline">
                      Communities
                    </a>
                  </li>
                  <li>
                    <a href="/events" className="hover:underline">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="/projects" className="hover:underline">
                      Projects
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h1 className="font-semibold text-lg">Contact Information</h1>
              <ul className="mt-2">
                <li>info@innovatech.com</li>
                <li>+123-456-789</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center">
            Copyright: &copy; {new Date().getFullYear()} Innovatech. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
