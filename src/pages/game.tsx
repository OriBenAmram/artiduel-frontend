import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { selectedOpponent } from '../store/store'
import { addDrawing } from '../store/slicers/draw.slice'

import { GameField } from '../cmps/game-field'
import { GameHeader } from '../cmps/game-header'

import { canvasService } from '../services/canvas.service'
import { socketService } from '../services/socket.service'
import { drawService } from '../services/draw.service'

export function Game() {
    const navigate = useNavigate()
    const playerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const opponentImageRef = useRef<HTMLImageElement | null>(null);
    const opponentUser = useSelector(selectedOpponent)
    const dispatch = useDispatch()

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

    const onSaveBoard = async () => {
        // TODO - game end modal - post it to your profile or continue to feed
        // DONE - create an object with two datas and more details
        const drawingToSave = canvasService.createDrawing(playerCanvasRef.current, opponentImageRef.current, opponentUser)
        // TODO - add it in backend
        try {

            const savedDraw = await drawService.save(drawingToSave)
            // TODO - add it to the drawings in the feed (store)
            dispatch(addDrawing(savedDraw))
            console.log('Done setting to store')
            // TODO - send the user to feed - there we would load the drawings and add it
        } catch (err) {
            console.log('err when saving drawing -', err);
        }
    }

    return <div className="game-page">
        <div className="game-content-conatiner">
            <GameHeader onSaveBoard={onSaveBoard} />
            <GameField opponentUser={opponentUser} playerCanvasRef={playerCanvasRef} opponentImageRef={opponentImageRef} />
            <button onClick={onQuitGame}>Cancel game</button>
        </div>
    </div>
}