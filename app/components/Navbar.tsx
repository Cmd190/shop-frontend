import { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  // State to manage the mobile menu's open/close status
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo or brand name */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              Logo
            </a>
          </div>

          {/* Desktop menu links */}
          <div className="hidden md:flex space-x-4">
            <NavLink text="Home" href="#" />
            <NavLink text="About" href="#" />
            <NavLink text="Services" href="#" />
            <NavLink text="Contact" href="#" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414L12 13.414l-4.864 4.864a1 1 0 0 1-1.414-1.414L10.586 12 5.722 7.136a1 1 0 0 1 1.414-1.414L12 10.586l4.864-4.864a1 1 0 0 1 1.414 1.414L13.414 12l4.864 4.864z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg transition-all duration-300`}>
        <div className="flex flex-col items-start px-4 py-2 space-y-2">
          <NavLink text="Home" href="#" />
          <NavLink text="About" href="#" />
          <NavLink text="Services" href="#" />
          <NavLink text="Contact" href="#" />
        </div>
      </div>
    </nav>
  );
};