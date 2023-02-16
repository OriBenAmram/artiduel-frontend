import { useDispatch } from 'react-redux'

import { IDraw } from '../model/interfaces/IDraw'
import { drawService } from '../services/draw.service'

import { removeDrawing } from '../store/slicers/draw.slice'

import { IoIosHeartEmpty } from 'react-icons/io'

interface DrawPreviewProps {
    draw: IDraw
}

export function DrawPreview({ draw }: DrawPreviewProps) {
    const dispatch = useDispatch()

    const onRemoveDrawing = async () => {
        await drawService.remove(draw._id)
        dispatch(removeDrawing(draw._id))
    }
    console.log('draw:', draw);

    return <article className="draw-preview">
        {/* <h2>{draw.title}</h2>
        <button onClick={onRemoveDrawing}>X</button> */}
        <div className="draw-preview__first-draw">
            <div className="draw-preview__img"></div>
            <div className="draw-preview__user-bar">
                <IoIosHeartEmpty className="draw-preview__like-btn" />
                <div className="draw-preview__user-details-container">
                    <div className="draw-preview__user-avatar" title={`${draw.player1.fullname}'s image `}></div>
                    
                    <span className="draw-preview__likes-amount">5 likes</span>
                </div>
            </div>
        </div>
        <div className="draw-preview__second-draw">
            <div className="draw-preview__img"></div>
            <div className="draw-preview__user-bar">
                <IoIosHeartEmpty className="draw-preview__like-btn" />
                <div className="draw-preview__user-avatar"></div>
            </div>
        </div>
        <div className="draw-preview__title-display">
            {draw.title}
        </div>
    </article>
}

// <div className="draw-preview__first-draw">
//             <div className="draw-preview__draw-header">
//                 <div className="draw-preview__user-avatar"></div>
//             </div>
//             <div className="draw-preview__content-container">
//                 <div className="img"></div>
//                 <div className="draw-preview__like-cta-box"></div>
//             </div>
//         </div>
//         <div className="draw-preview__second-draw">
//             <div className="draw-preview__draw-header"></div>
//             <div className="draw-preview__content-container">
//                 <div className="img"></div>
//                 <div className="draw-preview__like-cta-box"></div>
//             </div>
//         </div>