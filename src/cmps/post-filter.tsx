import { useState, useEffect, useRef, useCallback } from 'react'

import { BiSortAlt2 } from 'react-icons/bi'
import { FiFilter } from 'react-icons/fi'

interface PostFilterProps {
    text: string
}

export function PostFilter({ text }: PostFilterProps) {
    const [typedText, setTypedText] = useState('')
    let typingIntervalId = useRef<null | NodeJS.Timeout>(null)

    const startTyping = useCallback(() => {
        let i = -1
        typingIntervalId.current = setInterval(() => {
            i++
            setTypedText((prevState) => prevState + text.charAt(i))
            if (i === text.length && typingIntervalId.current) {
                clearInterval(typingIntervalId.current)
            }
        }, 90)
    }, [text])

    useEffect(() => {
        startTyping()
        return (() => {
            if (typingIntervalId.current) clearInterval(typingIntervalId.current)
        })
    }, [startTyping])

    return <div className="post-filter-container">
        <input className="search-input" type="text" placeholder={typedText} />
        <div className="filter-options">
            <button className="sort-btn"> <BiSortAlt2 className="icon" /> Sort</button>
            <button className="filter-btn"> <FiFilter className="icon" /> Filter</button>
        </div>
    </div>
}