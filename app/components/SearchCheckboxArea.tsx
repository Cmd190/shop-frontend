import { Checkbox } from '@mui/material';
import { useState, type ReactElement } from 'react';
import type React from 'react';
import { useSearchParams } from 'react-router';
import type { searchUrlParams } from '~/routes/Search';
import SearchCheckbox from './SearchCheckbox';


type SearchCheckboxAreaProps = {
  title:string,
  items:string[]
  toggleItem: (item: string) => void,
  paramName: searchUrlParams

}

/**
 * Displaying a list of checkboxes which values are dependent of the value the url search parameters.
 * Checked if url contains @param paramName and the corresponding item from @param items 
 * @param param0 
 * @returns 
 */
const SearchCheckboxArea = ( {title, items, toggleItem, paramName}: SearchCheckboxAreaProps ) : ReactElement =>  {
  return <div className='mb-6 text-gray-800'>
    <h3 className='font-medium mb-2'>{title}</h3>
    {items.map(item => (
      <SearchCheckbox key={item} toggleItem={toggleItem} item={item} paramName={paramName}   />
    ))}
  </div>;
}

export default SearchCheckboxArea


