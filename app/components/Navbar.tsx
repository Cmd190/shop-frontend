import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Searchbar from "./Searchbar";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from "@mui/material/styles";
import { ShoppingCartContext } from "./ShoppingCartContext";

export type NavItem = {
  name: string;
  path: string;
};

interface NavItemsProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavItemsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const cart = useContext(ShoppingCartContext)
    

  const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

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
            <IconButton>
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={cart?.state.total} color="primary" overlap="circular" />
            </IconButton>
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
