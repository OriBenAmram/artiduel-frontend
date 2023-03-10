import { useState } from 'react'

import { MdClose } from 'react-icons/md'
import { CancelGameModal } from './cancel-game-modal'
import { GameEndModal } from './game-end-modal'

interface ModalProps {
    type: string
    isOppDisconnect: boolean
    isOppQuit: boolean
    toggleModal: () => void
    onSaveBoard: () => void
    onQuitGame: () => void
}

export function DynamicGameModal({  type, isOppDisconnect, isOppQuit ,onQuitGame, toggleModal,  onSaveBoard }: ModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const setModalLoading = (isLoading: boolean) => {
        setIsLoading(isLoading)
    }

    return <div className="screen-overlay" onClick={toggleModal}>
        <div className="game-end-modal" onClick={(ev) => {
            ev.stopPropagation()
        }}>
            <button className="close-btn">
                <MdClose onClick={toggleModal} />
            </button>
            {!isLoading && <div className="end-content">
                {type === 'game-end' && <GameEndModal setIsLoading={setModalLoading} toggleModal={toggleModal} isOppDisconnect={isOppDisconnect} isOppQuit={isOppQuit} onSaveBoard={onSaveBoard} />}
                {type === 'cancel-game' && <CancelGameModal onQuitGame={onQuitGame} toggleModal={toggleModal} />}
            </div>}
            {isLoading && <div>Loading modal</div>}
        </div>
    </div>
}