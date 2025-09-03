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

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);
  return(
    // change margin for logo
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        <img 
          className="h-9 w-auto md:h-10 lg:h-20 transition-all duration-200"
          src="/logo_transparent.png" 
          alt="chocolate with heart"/>
          
      </Link>

    <div className="flex space-x-6">
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({isActive}) => 
          `text-lg font-medium transition-colors ${isActive? "text-blue-600" : "text-gray-600 hover: text-blue-500"}`}>
            {item.name}
          </NavLink>
      ))}
    </div>
    </nav>

  );
}
