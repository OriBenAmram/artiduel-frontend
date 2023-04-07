import { FC } from 'react'
import { PostFilter } from "./post-filter"

interface FeedHeaderProps {
    onSetFilter: (filterBy: { txt: String }) => void
}

export const FeedHeader: FC<FeedHeaderProps> = ({ onSetFilter }) => {
    return <div className="feed-header">
        <div className="header-txt">
            <h1>Get some inspiration</h1>
            <h2>Explore what others have been doing lately</h2>
        </div>
        <PostFilter text={'Look for drawings by users & game titles...!'} onSetFilter={onSetFilter} />
    </div>
}