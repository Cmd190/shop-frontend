import { Checkbox } from "@mui/material"
import type { ReactElement } from "react"
import { useSearchParams } from "react-router-dom"
import type { searchUrlParams } from "~/routes/Search"

type SearchCheckboxProps={
  item:string,
  toggleItem: (item: string) => void,
  paramName:searchUrlParams
}

/**
 * Displaying a checkbox which value is dependent of the value the url search parameters.
 * Checked if url contains @param paramName and the corresponding item from @param item 
 * @param param0 
 * @returns 
 */
const SearchCheckbox = ({item, toggleItem, paramName}: SearchCheckboxProps): ReactElement => {
    const [search, _] = useSearchParams()
    const itemChecked = search.has(paramName, item)
    return (
      <label className='flex items-center space-x-2 mb-1'>
        <Checkbox
         checked = {itemChecked}
         onChange={_ => {
          toggleItem(item)
          }} />
        <span>{item}</span>
      </label>
    )
}

export default SearchCheckbox