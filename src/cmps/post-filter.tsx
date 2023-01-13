import { BiSortAlt2 } from 'react-icons/bi'
import { FiFilter } from 'react-icons/fi'

export function PostFilter() {
    return <div className="post-filter-container">
        <input className="search-input" type="text" placeholder="Filter Posts & Users by name..." />
        <div className="filter-options">
            <button className="sort-btn"> <BiSortAlt2 className="icon" /> Sort</button>
            <button className="filter-btn"> <FiFilter className="icon" /> Filter</button>
        </div>
    </div>
}