import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

import { socketService } from '../services/socket.service'
export function Game() {
    const { roomId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        socketService.on('opponent-left', onOpponentLeft)

        return (() => {
            socketService.off('opponent-left')
        })
    })

    const onOpponentLeft = (opponentId: string) => {
        console.log(`Opponent with the Id ${opponentId} left the room`);
        navigate('/feed')
    }

    const onQuitGame = () => {
        console.log('leaving game - emit left-room')
        socketService.emit('left-room')
        navigate('/feed')
    }

    return <div className="game-page">
        <div className="game-content-conatiner">
            <div className="game-hero">
                <h1 className='room-title'>Room with id: {roomId}</h1>
                <div className="timer-box">07:42</div>
            </div>
            <button onClick={onQuitGame}>Cancel game</button>
        </div>
    </div>
}