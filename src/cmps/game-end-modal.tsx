import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MdClose } from 'react-icons/md'

interface ModalProps {
    toggleModal: () => void
    isOppDisconnect: boolean
    onSaveBoard: () => void
}

export function GameEndModal({ toggleModal, isOppDisconnect, onSaveBoard }: ModalProps) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const onFeedClick = () => {
        navigate('/feed')
        toggleModal()
    }

    const getModalText = () => {
        if (isOppDisconnect) return 'It seems like your opponent disconnected. You can either post this post or return home.'
        return 'Your drawing is already published! Make sure to check it out in the feed...'
    }

    const onPostDrawing = async (ev: { preventDefault: () => void }) => { 
        ev.preventDefault()
        setIsLoading(true)
        await onSaveBoard()
        navigate('/feed')
    }

    return <div className="screen-overlay" onClick={toggleModal}>
        <div className="game-end-modal" onClick={(ev) => {
            ev.stopPropagation()
        }}>
            <button className="close-btn">
                <MdClose onClick={toggleModal} />
            </button>
           {!isLoading && <div className="end-content">
                <h1>Nice drawing!</h1>
                <p className="desc">{getModalText()}</p>
                {!isOppDisconnect && <button className="primary-btn" onClick={onFeedClick}>Feed</button>}
                {isOppDisconnect && <div>
                    <button className="primary-btn" onClick={onPostDrawing}>Post</button>
                    <button className="alternative-btn" onClick={onFeedClick}>Home</button>
                </div>}
                {/* <button className="alternative-btn" onClick={() => onSubmit({ isProfilePost: false })}>Continue home</button> */}
            </div>}
            {isLoading && <div>Loading modal</div>}
        </div>
    </div>
}