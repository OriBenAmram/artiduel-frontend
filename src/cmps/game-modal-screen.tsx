import { useState, MouseEvent } from 'react'
import { useNavigate, useLocation, Location } from 'react-router-dom'

import { MdClose } from 'react-icons/md'
import { socketService } from '../services/socket.service'

interface GameModalProps {
    toggleMenu: () => void
}

export function GameModalScreen({ toggleMenu }: GameModalProps) {
    const [level, setLevel] = useState('Easy')
    const navigate = useNavigate()
    const location: Location = useLocation()

    const onClickModal = (ev: MouseEvent) => {
        ev.stopPropagation()
    }

    const onNewGame = () => {
        if (location.pathname !== '/waiting-room') navigate(`/waiting-room`)
        socketService.emit('room-level-entrance', level)
        toggleMenu()
    }

    const onPlayFriends = () => {
        toggleMenu()
        navigate('/friends')
    }

    return <div className={`screen-overlay`} onClick={toggleMenu}>
        <div className="game-modal" onClick={onClickModal}>
            <button className="close-btn" onClick={toggleMenu}><MdClose className='icon' /></button>
            <h2>Draw to win!</h2>
            <div className="level-display">{level}</div>
            <div className="level-options">
                <button className="secondary-btn-light" onClick={() => setLevel('Easy')}>Easy</button>
                <button className="secondary-btn-light" onClick={() => setLevel('Meduim')}>Medium</button>
                <button className="secondary-btn-light" onClick={() => setLevel('Hard')}>Hard</button>
            </div>
            <button className="primary-btn" onClick={onNewGame}>Start Game</button>
            <button className="alternative-opt-btn secondary-btn-light" onClick={onPlayFriends}>Play against friends</button>
        </div>
    </div>
}