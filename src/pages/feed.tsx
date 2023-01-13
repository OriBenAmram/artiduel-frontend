import { useEffect, useState } from "react";

import { FeedHeader } from "../cmps/feed-header";
import { PostList } from "../cmps/post-list";

export function Feed() {
    const [isLoading, setIsLoading] = useState(false)

    const posts = [
        {
            _id: '123',
            title: 'First drawing of mine',
            owner: 'Ori Ben Amram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '124',
            title: 'Best description',
            owner: 'Lisa Pizza',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '125',
            title: 'I like it',
            owner: 'Ori Ben Amram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '126',
            title: 'I love titles',
            owner: 'Vicky Shicky',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '127',
            title: 'Kill it',
            owner: 'Daniel Baram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '128',
            title: 'Disney and stuff',
            owner: 'Kaki Pupu',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '129',
            title: 'Does not care',
            owner: 'Pipi Shipi',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '131',
            title: 'Mama I like',
            owner: 'Nicolas',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '132',
            title: 'Just some',
            owner: 'Noam Shiri',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
    ]

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, [])

    return <div className="feed-page basic-layout">
        <FeedHeader />
        {!isLoading && <PostList posts={posts} />}
        {/* Loader */}
        {isLoading && <div className="loading-text-container">
            <h2>Loading the posts...</h2>
            <p>It would only take a second</p>
        </div>}
        {/* No Posts */}
        {(!posts.length && !isLoading) && <div className="no-posts-modal">
            <h1>Be the first one to post a drawing, be the first one to do so!</h1>
            <button className="primary-btn"> Draw one </button>
        </div>}
    </div>
}