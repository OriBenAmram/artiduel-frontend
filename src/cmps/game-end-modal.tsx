import { useNavigate } from 'react-router-dom'

interface ModalProps {
    isOppDisconnect: boolean
    isOppQuit: boolean
    toggleModal: () => void
    onSaveBoard: () => void
    setIsLoading: (isLoading: boolean) => void
}

export function GameEndModal({ isOppDisconnect, isOppQuit, toggleModal, onSaveBoard, setIsLoading }: ModalProps) {
    const navigate = useNavigate()

    const onFeedClick = () => {
        navigate('/feed')
        toggleModal()
    }

    const getModalText = () => {
        if (isOppDisconnect) return 'It seems like your opponent disconnected. You can either post this drawing or return home.'
        if (isOppQuit) return 'It seems like your opponent quited. Now, you can either post this drawing or return home'
        return 'Your drawing is already published! Make sure to check it out in the feed...'
    }

    const onPostDrawing = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault()
        setIsLoading(true)
        await onSaveBoard()
        navigate('/feed')
    }

    return <div className="end-content">
        <h1>Nice drawing!</h1>
        <p className="desc">{getModalText()}</p>
        {(!isOppDisconnect && !isOppQuit) && <button className="primary-btn" onClick={onFeedClick}>Feed</button>}
        {(isOppDisconnect || isOppQuit) && <div>
            <button className="primary-btn" onClick={onPostDrawing}>Post</button>
            <button className="alternative-btn" onClick={onFeedClick}>Home</button>
        </div>}
    </div>
}