import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavItem = {
  name: string;
  path: string;
};

const navItems : NavItem[] = [
  {name: "Home", path: "/"},
  {name: "About", path: "/about"},
  {name: "Contact", path: "/contact"}
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-1">
      
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 mr-6">
          <img
            src="/logo_transparent.png"
            alt="chocolate with heart"
            className="max-h-10 w-auto md:max-h-12 lg:max-h-24 transition-all duration-200"
          />
          <span className="text-xl md:text-2xl font-bold text-orange-900">
            Your chocolate shop
          </span>
        </Link>
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
