import { Checkbox } from '@mui/material';
import { useState, type ReactElement } from 'react';
import type React from 'react';


type  SearchCheckboxControlProps = {
  header:string,
  items:string[],
  toggleItem: (item: string) => void

}
const SearchCheckboxControl = ( {header, items, toggleItem}: SearchCheckboxControlProps ) : ReactElement =>  {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  return <div className='mb-6 text-gray-800'>
    <h3 className='font-medium mb-2'>{header}</h3>
    {items.map(item => (
      <label key={item} className='flex items-center space-x-2 mb-1'>
        <Checkbox onChange={_ => toggleItem(item)} />
        <span>{item}</span>
      </label>
    ))}
  </div>;
}

export default SearchCheckboxControl
