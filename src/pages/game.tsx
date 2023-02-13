import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { selectedOpponent } from '../store/store'

import { GameField } from '../cmps/game-field'
import { GameHeader } from '../cmps/game-header'

import { canvasService } from '../services/canvas.service'
import { socketService } from '../services/socket.service'

export function Game() {
    const navigate = useNavigate()
    const playerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const opponentCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const opponentUser = useSelector(selectedOpponent)

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

    const onSaveBoard = () => { 
        console.log('save')
        // const drawingToSave = canvasService.createDrawing(playerCanvasRef.current, opponentCanvasRef.current)
        // TODO - game end modal - post it to your profile or continue to feed
        // TODO - create an object with two datas and more details
        // { player1 : { _id : 111, fullname: 'Ori', dataUrl: fsdkmgdfk, likes: 20 }, player2: { _id: 2312, fullname: 'Vicky', dataUrl: 3rfsd, likes: 42 }, createdAt: 102393420, _id: mongoId, word: 'Elephant', comments: []}
        // TODO - send it to backend to save to feed
        // TODO - send the user to feed - there we would load the drawings and add it
    }

    return <div className="game-page">
        <div className="game-content-conatiner">
            <GameHeader onSaveBoard={onSaveBoard}/>
            <GameField opponentUser={opponentUser} playerCanvasRef={playerCanvasRef} opponentCanvasRef={opponentCanvasRef}/>
            <button onClick={onQuitGame}>Cancel game</button>
        </div>
    </div>
}