import { useState, useEffect, useRef, useCallback, FC } from 'react'
import { useSearchParams } from "react-router-dom";

// import { toast } from 'react-toastify';


import { BiSortAlt2 } from 'react-icons/bi'
import { FiFilter } from 'react-icons/fi'

interface PostFilterProps {
    text: string
    onSetFilter: (filterBy: { txt: String }) => void
}

export const PostFilter: FC<PostFilterProps> = ({ text, onSetFilter }) => {
    const [typedText, setTypedText] = useState('')
    const [filterBy, setFilterBy] = useState({ txt: '' })
    let [searchParams, setSearchParams] = useSearchParams()

    let typingIntervalId = useRef<null | NodeJS.Timeout>(null)
    let setFilterIntervalId = useRef<null | NodeJS.Timeout>(null)
    let isFirstFilter = useRef<null | boolean>(null)

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
        let txtFilterFromParams = searchParams.get('txt')
        if (txtFilterFromParams) {
            isFirstFilter.current = true
            setFilterBy({ txt: txtFilterFromParams })
        }
        else startTyping()

        return (() => {
            if (typingIntervalId.current) clearInterval(typingIntervalId.current)
        })
    }, [startTyping])

    useEffect(() => {
        if (isFirstFilter.current) {
            onSetFilter(filterBy)
            isFirstFilter.current = false
            return
        }

        if (setFilterIntervalId.current) clearTimeout(setFilterIntervalId.current)
        setFilterIntervalId.current = setTimeout(() => {
            onSetFilter(filterBy)
        }, 1000)

        return () => {
            if (setFilterIntervalId.current) clearTimeout(setFilterIntervalId.current)
        }
    }, [filterBy])

    const handleChange = ({ target: { value, name } }: any) => {
        setSearchParams({ [name]: value })
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    const onTemporarlyWarning = () => {
        // toast.warning(`I'm currently working on adding this feature, please try it again in a few days`,);
        return
    }

    return <div className="post-filter-container">
        <input className="search-input" type="text" value={filterBy.txt} placeholder={typedText} name='txt' onChange={handleChange} />
        <div className="filter-options">
            <button className="sort-btn" onClick={onTemporarlyWarning}> <BiSortAlt2 className="icon" /> Sort</button>
            <button className="filter-btn" onClick={onTemporarlyWarning}> <FiFilter className="icon" /> Filter</button>
        </div>
    </div>
}