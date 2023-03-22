import { useEffect, useRef, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateDrawing, removeDrawing } from '../store/slicers/draw.slice'
import { selectedUser } from '../store/store'

import { drawService } from '../services/draw.service'

import { IDraw, ILikeEntity } from '../model/interfaces/IDraw.interface'

import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { toast } from 'react-toastify';

import avatar2 from '../assets/imgs/avatar2.jpg'


interface DrawPreviewProps {
    draw: IDraw
}

interface Player {
    fullname: string
    imgUrl: string | null
    userId: string
    likes: ILikeEntity[]
    dataUrl: string
}

export const DrawPreview: FC<DrawPreviewProps> = ({ draw }) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(selectedUser)

    const firstDrawingRef = useRef<HTMLImageElement | null>(null)
    const secondDrawingRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if (firstDrawingRef.current) firstDrawingRef.current.src = draw.player1?.dataUrl || ''
        if (secondDrawingRef.current) secondDrawingRef.current.src = draw.player2?.dataUrl || ''
    })

    const onRemoveDrawing = async (): Promise<void> => {
        await drawService.remove(draw._id)
        dispatch(removeDrawing(draw._id))
    }

    const onLikeDrawing = async (playerId: string): Promise<void> => {

        if (!loggedInUser) {
            toast.info(
                `Please sign in so you could like drawings`,
            );
            return
        }
        let chosePlayer
        // create deep copy
        const drawToSave = JSON.parse(JSON.stringify(draw))
        // preparing like and chosen player to effect likes array
        const like = { userId: loggedInUser._id, fullname: loggedInUser.fullname }
        // Ori - I changed the parameter of the function to id so that the function would be reusable for both preview components (in profile preview there is no access to the player number in the dual)
        if (drawToSave.player1.userId === playerId) {
            chosePlayer = drawToSave.player1
        } else if (drawToSave.player2.userId === playerId) {
            chosePlayer = drawToSave.player2
        } else { 

        }
        const likeIdx = chosePlayer.likes.findIndex((l: ILikeEntity) => l.userId === loggedInUser._id)
        console.log('likeIdx:', likeIdx);
        
        if (likeIdx === -1) chosePlayer.likes.push(like)
        else chosePlayer.likes.splice(likeIdx, 1)
        console.log('drawToSave:', drawToSave);
        
        // update data
        try {
            dispatch(updateDrawing(drawToSave))
            await drawService.save(drawToSave)

        } catch (err) {
            console.log('err when liking a drawing, replacing draw back', err);
            dispatch(updateDrawing(draw))
        }
    }

    const getLikeIconToDisplay = (player: Player, playerId: string) => {
        let isLike
        if (loggedInUser) isLike = player.likes.findIndex((l: ILikeEntity) => l.userId === loggedInUser._id)
        if (isLike !== -1) return <IoIosHeart className="draw-preview__like-btn draw-preview__like-btn--full" title="Like button" onClick={() => onLikeDrawing(playerId)} />
        return <IoIosHeartEmpty className="draw-preview__like-btn " title="Like button" onClick={() => onLikeDrawing(playerId)} />
    }

    return <article className="draw-preview">
        <button className='draw-preview__close-btn' onClick={onRemoveDrawing}>X</button>
        <div className="draw-preview__first-draw">
            <img className="draw-preview__img" alt='user-img' src='' ref={firstDrawingRef} />
            <div className="draw-preview__user-bar">
                {getLikeIconToDisplay(draw.player1!, draw.player1!.userId)}
                <div className="draw-preview__user-details-container">
                    <img className="draw-preview__user-avatar" title={`${draw.player1?.fullname}'s image `} alt="user avatar" src={draw.player1?.imgUrl ? draw.player1.imgUrl : avatar2} />
                    <div className="draw-preview__user-desc">
                        <div className="draw-preview__user-fullname">{draw.player1?.fullname}</div>
                        <span className="draw-preview__likes-amount" onClick={onRemoveDrawing}>{draw.player1?.likes.length} likes</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="draw-preview__second-draw">
            <img className="draw-preview__img" alt='user-img' src='' ref={secondDrawingRef} />
            <div className="draw-preview__user-bar">
                {getLikeIconToDisplay(draw.player2!, draw.player2!.userId)}
                <div className="draw-preview__user-details-container">
                    <img className="draw-preview__user-avatar" title={`${draw.player2?.fullname}'s image `} alt="user avatar" src={draw.player2?.imgUrl ? draw.player2.imgUrl : avatar2} />
                    <div className="draw-preview__user-desc">
                        <div className="draw-preview__user-fullname">{draw.player2?.fullname}</div>
                        <span className="draw-preview__likes-amount" onClick={onRemoveDrawing}>{draw.player2?.likes.length} likes</span>
                    </div>
                </div>
            </div>
        </div>
        <h2 className='draw-preview__title-display'>{draw.title}</h2>
    </article>
}