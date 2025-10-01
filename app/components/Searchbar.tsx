import React, { useState, type ReactElement } from "react";
import {
  NavLink,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router";
import { getRoute, RouteName } from "~/routes";
import { searchUrlParams } from "~/routes/Search";
import type { Product } from "~/types/types";

const Searchbar = (): ReactElement => {
  const [search, setSearch] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const location = useLocation();

  const createSearchParameter = (term: string): string =>
    term.toLowerCase().replace(" ", "+");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase().replace(" ", "+");
    setSearchTerm(e.target.value);

    //only change url when on search page. Creates unnecessary data fetching otherwise
    if(location.pathname === getRoute(RouteName.Search)){
      const newSearchParams = search;
      newSearchParams.set(searchUrlParams.productName, e.target.value);
      setSearch(newSearchParams);
    }
    
  };

  // TODO clear search Value on reload/navigation
  return (
    <div className="flex items-center gap-2 w-full max-w-md mx-auto">
      <input
        type="text"
        name="searchbar"
        value={searchTerm}
        onChange={onChange}
        placeholder="search"
        className="flex-1 px-4 py-1 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-800 transition"
      />
      <NavLink to={`${getRoute(RouteName.Search)}?${searchUrlParams.productName}=${searchTerm}`}>
        <button className="px-4 py-1 bg-orange-900 text-white font-medium rounded-xl hover:bg-orange-800 active:scale-95 transition">
          Search
        </button>
      </NavLink>
    </div>
  );
};

export default Searchbar;
