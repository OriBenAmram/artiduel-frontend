import { PostPreview } from "./post-preview";
import { IPost } from "../model/interfaces/IPost";
import { FC } from 'react'

interface PostListProps {
    posts: IPost[]
}
export const PostList: FC<PostListProps> = ({ posts }) => {
    // export function PostList : FC<PostListProps>({ posts }) {
    return <div className="post-list">
        <PostPreview post={null} />
        {posts.map((post) => <PostPreview key={post._id} post={post} />)}
    </div>
}