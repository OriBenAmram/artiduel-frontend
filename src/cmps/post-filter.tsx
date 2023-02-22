import { useState, useEffect, useRef, useCallback } from 'react'

import { BiSortAlt2 } from 'react-icons/bi'
import { FiFilter } from 'react-icons/fi'

interface PostFilterProps {
    text: string
}

export function PostFilter({ text }: PostFilterProps) {
    const [typedText, setTypedText] = useState('')
    let typingIntervalId: any = useRef(null)

    const startTyping = useCallback(() => {
        let i = 0
        typingIntervalId.current = setInterval(() => {
            setTypedText((prevState) => {
                return prevState + text.charAt(i)
            })
            i++
            if (i === text.length) {
                clearInterval(typingIntervalId.current)
            }
        }, 80)
    }, [text])

    useEffect(() => {
        startTyping()

        return (() => clearInterval(typingIntervalId.current))
    }, [startTyping])

    return <div className="post-filter-container">
        <input className="search-input" type="text" placeholder={typedText} />
        {/* <input className="search-input" type="text" placeholder={typedText} /> */}
        <div className="filter-options">
            <button className="sort-btn"> <BiSortAlt2 className="icon" /> Sort</button>
            <button className="filter-btn"> <FiFilter className="icon" /> Filter</button>
        </div>
    </div>
}