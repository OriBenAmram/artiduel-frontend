import { DrawPreview } from "./draw-preview";
import { IDraw } from "../model/interfaces/IDraw"
import { FC } from 'react'

interface DrawListProps {
    drawings: IDraw[]
}
export const DrawList: FC<DrawListProps> = ({ drawings }) => {
    // export function DrawList : FC<DrawListProps>({ posts }) {
    if (!drawings || !drawings.length) return <h1>No drawings in list</h1>
    return <div className="post-list">
        {/* <DrawPreview post={null} /> */}
        {drawings.map((draw) => <DrawPreview key={draw._id} draw={draw} />)}
    </div>
}