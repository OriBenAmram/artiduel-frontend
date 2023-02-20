import { useState, useEffect, useRef } from 'react'

import { BiSortAlt2 } from 'react-icons/bi'
import { FiFilter } from 'react-icons/fi'

export function PostFilter() {
    const [typedText, setTypedText] = useState('')
    // const inputRef = useRef<HTMLInputElement | null>(null)
    
    useEffect(() => {
        startTyping()
    }, [])

    const startTyping = () => {
        let i = 0
        const text = 'Search drawings by users & game titles...'
        const typingIntervalId = setInterval(() => {
            setTypedText((prevState) => prevState + text.charAt(i))
            i++
            if (i === text.length) {
                clearInterval(typingIntervalId)
            }
        }, 1500)
    }

    return <div className="post-filter-container">
        <input className="search-input" type="text" placeholder={typedText} />
        {/* <input className="search-input" type="text" placeholder={typedText} ref={inputRef} /> */}
        <div className="filter-options">
            <button className="sort-btn"> <BiSortAlt2 className="icon" /> Sort</button>
            <button className="filter-btn"> <FiFilter className="icon" /> Filter</button>
        </div>
    </div>
}