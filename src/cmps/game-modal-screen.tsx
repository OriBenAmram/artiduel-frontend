import { useState, MouseEvent, FC } from 'react'
import { useNavigate, useLocation, Location } from 'react-router-dom'

import { socketService } from '../services/socket.service'

// import { toast } from 'react-toastify';

import { MdClose } from 'react-icons/md'

interface GameModalProps {
    toggleMenu: () => void
}

export const GameModalScreen: FC<GameModalProps> = ({ toggleMenu }) => {
    const [level, setLevel] = useState('Easy')
    const navigate = useNavigate()
    const location: Location = useLocation()

    const onClickModal = (ev: MouseEvent): void => {
        ev.stopPropagation()
        // prevent closing it
    }

    const onNewGame = (): void => {
        if (location.pathname !== '/waiting-room') navigate(`/waiting-room`)
        socketService.emit('room-level-entrance', level)
        toggleMenu()
    }

    const onPlayFriends = (): void => {
        // toast.info(`Sorry, this feature would be available soon.`);
        toggleMenu()
        navigate('/friends')
    }

    return <div className={`screen-overlay`} onClick={toggleMenu}>
        <div className="game-modal" onClick={onClickModal}>
            <button className="close-btn" onClick={toggleMenu}><MdClose className='icon' /></button>
            <h2>Draw to win!</h2>
            <div className="level-display">{level}</div>
            <div className="level-options">
                <button className="secondary-btn-light" onClick={() => setLevel('easy')}>Easy</button>
                <button className="secondary-btn-light" onClick={() => setLevel('medium')}>Medium</button>
                <button className="secondary-btn-light" onClick={() => setLevel('hard')}>Hard</button>
            </div>
            <button className="primary-btn" onClick={onNewGame}>Start Game</button>
            <button className="alternative-opt-btn secondary-btn-light" onClick={onPlayFriends}>Play against friends</button>
        </div>
    </div>
}