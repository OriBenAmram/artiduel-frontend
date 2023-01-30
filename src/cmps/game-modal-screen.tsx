import { useState, useEffect, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { SOCKET_EMIT_ENTER_ROOM } from '../services/socket.service'

import { MdClose } from 'react-icons/md'
import { utilService } from '../services/util.service'
import { socketService } from '../services/socket.service'

interface GameModalProps {
    toggleMenu: () => void
}

export function GameModalScreen({ toggleMenu }: GameModalProps) {
    const [level, setLevel] = useState('Easy')
    const navigate = useNavigate()

    useEffect(() => {
        loadOpenRooms()
    }, [])

    const loadOpenRooms = () => {
        console.log('loading')
    }

    const onClickModal = (ev: MouseEvent) => {
        ev.stopPropagation()
    }

    const onNewGame = () => {
        // if there is already a room with the same chosed level - go there. else - create a new one.
        const roomId = utilService.makeId()
        const socketInfo = { roomId, level }
        socketService.emit('room-level-entrance', JSON.stringify(socketInfo))
        navigate(`/game/${roomId}`)
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