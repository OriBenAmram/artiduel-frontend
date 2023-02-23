
interface ModalProps {
    toggleModal: () => void
    onQuitGame: () => void
}

export function CancelGameModal({ toggleModal, onQuitGame }: ModalProps) {
    return <div className="end-content">
        <h1>Are you sure?</h1>
        <p>If you'll cancel the game, your opponent would chose whether to post it or not.</p>
        <button className="primary-btn" onClick={toggleModal}>Resume game</button>
        <button className="alternative-btn" onClick={onQuitGame}>Cancel</button>
    </div>
}