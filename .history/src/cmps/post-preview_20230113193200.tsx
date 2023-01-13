import { useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineHeart } from 'react-icons/hi'
import { IPost } from '../model/interfaces/IPost'

interface PostPreviewProps {
    post: IPost | null
}

export function PostPreview({ post }: PostPreviewProps) {
    const headerRef = useRef<HTMLDivElement>(null)

    const onMouseEnter = () => {
        if (post || !headerRef.current) return
        headerRef.current.classList.add('open')
        headerRef.current.innerText = 'Your next master-piece!'
    }

    const onMouseLeave = () => {
        if (post || !headerRef.current) return
        headerRef.current.innerText = '';
        headerRef.current.classList.remove('open')
    }

    const onCreateDrawing = () => {
        console.log('create')
    }
    const getSumOfLikes = () => {
        return 25
    }

    return <article className={`post-preview ${post ? '' : 'add'}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onCreateDrawing}>
        <div className="preview-header" ref={headerRef }>
            <p> {post ? post.title : ''}</p>
            {post && <div className='likes-container'>
                {/* <button className='heart-container'>O</button> */}
                <span>{getSumOfLikes()}</span>
                <HiOutlineHeart className='heart-icon' />
            </div>}
        </div>
        {!post && <div className="add-new-post">
            <h2>Create a drawing</h2>
            <AiOutlinePlus className="plus-icon" />
        </div>}
    </article>
}