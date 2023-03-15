import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateDrawing } from '../store/slicers/draw.slice'
import { selectedUser } from '../store/store'

import { drawService } from '../services/draw.service'

import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

import { IFormattedDraw } from '../model/interfaces/IFormattedDraw'
import { ILikeEntity } from '../model/interfaces/IDraw'
import { IStorageUser } from "../model/interfaces/IUser";



interface DrawPreviewProps {
    draw: IFormattedDraw
}

export const ProfileDrawPreview: FC<DrawPreviewProps> = ({ draw }: DrawPreviewProps) => {

    /* 🚩 ~~~ TODO - refactor all functions and move them to an external file so that they will be used by the two preview components! ~~~ 🚩 */

    const dispatch = useDispatch()
    const loggedInUser = useSelector(selectedUser)
    // const firstDrawingRef = useRef<HTMLImageElement | null>(null)
    // const secondDrawingRef = useRef<HTMLImageElement | null>(null)

    const getLikeIconToDisplay = (player: IStorageUser = loggedInUser!, playerId: string) => {
        let isLike
        if (loggedInUser) isLike = draw.likes!.findIndex((l: ILikeEntity) => l.userId === loggedInUser._id)
        if (isLike !== -1) return <IoIosHeart className="draw-preview__like-btn draw-preview__like-btn--full" onClick={() => onLikeDrawing(playerId)} />
        return <IoIosHeartEmpty className="draw-preview__like-btn" onClick={() => onLikeDrawing(playerId)} />
    }

    const onLikeDrawing = async (playerId: string) => {
        if (!loggedInUser) return
        let chosePlayer
        // create deep copy
        const drawToSave = JSON.parse(JSON.stringify(draw))
        // preparing like and chosen player to effect likes array
        const like = { userId: loggedInUser._id, fullname: loggedInUser.fullname }
        // Ori - I changed the parameter of the function to id so that the function would be reusable for both preview components (in profile preview there is no access to the player number in the dual)
        if (drawToSave.player1?._id === playerId) {
            chosePlayer = drawToSave.player1
        } else if (drawToSave.player2?._id === playerId) {
            chosePlayer = drawToSave.player2
        }
        const likeIdx = chosePlayer?.likes.findIndex((l: ILikeEntity) => l.userId === loggedInUser._id)
        if (likeIdx === -1) chosePlayer?.likes.push(like)
        else chosePlayer?.likes.splice(likeIdx, 1)

        // update data
        try {
            dispatch(updateDrawing(drawToSave))
            await drawService.save(drawToSave)
        } catch (err) {
            console.log('err when liking a drawing, replacing draw back', err);
            dispatch(updateDrawing(draw))
        }
    }

    return <article className="profile-draw-preview">
        <div className="profile-draw-preview__bar">
            <h2 className="profile-draw-preview__bar__title-display">{draw.title}</h2>
            <div className="profile-draw-preview__bar__like">
                <div className="profile-draw-preview__bar__likes-amount">{draw.likes.length} Likes</div>
                {getLikeIconToDisplay(loggedInUser as IStorageUser, loggedInUser!._id)}
            </div>
        </div>
        <img className="profile-draw-preview__img" src={draw.dataUrl} alt="draw" />
    </article>
}