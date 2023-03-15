import { FC } from 'react'

import { DrawPreview } from "./draw-preview";
import { ProfileDrawPreview } from "./profile-draw-preview";

import { IDraw } from "../model/interfaces/IDraw"
import { IFormattedDraw } from '../model/interfaces/IFormattedDraw'

interface DrawListProps {
    drawings: IDraw[] | IFormattedDraw[]
    context?: string | undefined
}

export const DrawList: FC<DrawListProps> = ({ drawings, context }) => {
    // export function DrawList : FC<DrawListProps>({ posts }) {
    if (!drawings || !drawings.length) return <h1>No drawings in list</h1>
    if (context === 'profile') {
        return <div className="post-list">
            {/* -----Maybe change to DrawPreview----- */}
            {drawings.map((draw) => <ProfileDrawPreview key={draw._id} draw={draw as IFormattedDraw} />)}
        </div>
    }
    return <div className="post-list">
        {/* <DrawPreview post={null} /> */}
        {/* -----Maybe change to DualPreview----- */}
        {drawings.map((draw) => <DrawPreview key={draw._id} draw={draw as IDraw} />)}
    </div>
}