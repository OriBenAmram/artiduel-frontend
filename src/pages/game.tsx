import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { GameField } from '../cmps/game-field'
import { GameHeader } from '../cmps/game-header'

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
            <GameHeader />
            <GameField />
            <button onClick={onQuitGame}>Cancel game</button>
        </div>
    </div>
}