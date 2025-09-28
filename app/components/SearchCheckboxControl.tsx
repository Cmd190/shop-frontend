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
        <input type='checkbox' 
          // checked={isChecked} 
          onChange={_ => {
            toggleItem(item)
            // setIsChecked(prev => !prev)
          }}
          className='text-orange-900 focus:ring-orange-800' />
        <span>{item}</span>
      </label>
    ))}
  </div>;
}

export default SearchCheckboxControl
