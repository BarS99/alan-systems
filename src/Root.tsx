import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar sticky">
        <div className="flex max-w-7xl w-full mx-auto">
          <div className="navbar-start">
            <Link to="/" className="navbar-item font-bold">
              ALAN SYSTEMS
            </Link>
            <Link to="/event/add" className="navbar-item">
              Add Event
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Main = () => {
  return (
    <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-8 md:px-12 py-8">
      <Outlet />
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="py-3 bg-blue-3 text-sm font-medium">
      <p className="max-w-7xl w-full mx-auto text-center px-4">
        Bartłomiej Święch for Alan Systems. All rights reserved 2024 ©
      </p>
    </footer>
  );
};

const Root = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Root;
