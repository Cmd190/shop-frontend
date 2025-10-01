import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Searchbar from "./Searchbar";

export type NavItem = {
  name: string;
  path: string;
};

interface NavItemsProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavItemsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemCount, SetItemCount] = useState<number>(0)

  const ShoppingCart = 
   <NavLink     
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </NavLink>

  return (
    <nav className="bg-white shadow-md px-6 py-1">
      <div className="flex flex-col">
        <div className="flex flex-row">
         {/* logo */}
        <Link to="/" className="flex items-center space-x-2  mr-6">
            <img
              src="/logo_transparent.png"
              alt="chocolate with heart"
              className="max-h-10 w-auto md:max-h-12 lg:max-h-24 transition-all duration-200"
            />
            <span className="text-xl md:text-2xl font-bold text-orange-900">
              Your chocolate shop
            </span>
          </Link>
          <Searchbar/>
          <div className="flex items-center">
            <div className="space-x-2  mr-24 ml-8 ">
            {ShoppingCart}
            </div>
          </div>
          

          </div>
        <div className="flex items-center justify-between">
          
          {/* categories */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          
        </div>

        {/* mobile support */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
