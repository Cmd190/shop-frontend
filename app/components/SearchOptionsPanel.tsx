import { Box, Slider } from "@mui/material";
import { useEffect, useState, type ReactElement } from "react";
import SearchCheckboxArea from "./SearchCheckboxArea";
import { searchUrlParams } from "~/routes/Search";
import { useSearchParams } from "react-router-dom";

type SearchOptionsPanelProps = {
  priceRange: number[];
  handlePriceRangeChanged: (newValue: number[]) => void;
  toggleCategory: (item: string) => void;
  toggleManufacturer: (item: string) => void;
  categoryLabels: string[];
  manufacturerLabels: string[]
};

const SearchOptionsPanel = (props: SearchOptionsPanelProps): ReactElement => {
  const {
    priceRange,
    handlePriceRangeChanged,
    toggleCategory,
    toggleManufacturer,
    categoryLabels,
    manufacturerLabels,
  } = props;

   const [search, _] = useSearchParams()
   const [price, setPrice] = useState<number[]>(priceRange)
   useEffect(() =>{
        setPrice(
          [Number(search.get(searchUrlParams.minPrice) ?? priceRange[0]),
          Number(search.get(searchUrlParams.maxPrice) ?? priceRange[1])])

        console.log(`Setting initial min max to ${priceRange}`)
   },[])

   const onPriceRangeChanged = (newPriceRange:number[]) => {
    setPrice(newPriceRange)
    handlePriceRangeChanged(newPriceRange)
    console.log(`search price range slider value changed to ${newPriceRange}`)
   }
   

  return (
      <aside className="w-full md:w-1/4 bg-white dark:bg-white shadow-md p-4 rounded-xl">
        <div className="mb-6 ml-2">
          <h3 className="font-medium mb-10 text-gray-800">Price (€):</h3>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Price range"}
              value={price}
              onChange={(_, newValue) => onPriceRangeChanged(newValue)}
              valueLabelDisplay="on"
              getAriaValueText={(value) => `${value}€`}
            />
          </Box>
        </div>
        <SearchCheckboxArea
          title="Categories"
          items={categoryLabels}
          toggleItem={toggleCategory}
          paramName={searchUrlParams.category}
        />
        <SearchCheckboxArea
          title="Manufacturer"
          items={manufacturerLabels}
          toggleItem={toggleManufacturer}
          paramName={searchUrlParams.manufacturer}

        />
      </aside>
  );
};

export default SearchOptionsPanel;
