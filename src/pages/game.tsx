import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { selectedIsHost, selectedOpponent } from '../store/store'
import { addDrawing } from '../store/slicers/draw.slice'

import { GameField } from '../cmps/game-field'
import { GameHeader } from '../cmps/game-header'
import { GameEndModal } from '../cmps/game-end-modal'

import { canvasService } from '../services/canvas.service'
import { socketService } from '../services/socket.service'
import { drawService } from '../services/draw.service'

export function Game() {
    const navigate = useNavigate()
    const playerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const opponentImageRef = useRef<HTMLImageElement | null>(null);
    const opponentUser = useSelector(selectedOpponent)
    const isHost = useSelector(selectedIsHost)
    const dispatch = useDispatch()

    const [isGameEndModalOpen, setModalOpen] = useState(false)
    const [isGameOn, setGameMode] = useState(true)
    const [isOppDisconnect, setOppDisconnect] = useState(false)

    useEffect(() => {
        socketService.on('opponent-disconnect', onOpponentDisconnect)
        socketService.on('opponent-quit', onOpponentQuit)

        return (() => {
            socketService.off('opponent-disconnect')
            socketService.off('opponent-quit')
            canvasService.emptyCanvasFromStorage()
        })
    }, [])

    // Opp disconnect
    const onOpponentDisconnect = () => {
        console.log('sorry he quited. should stop time and show a victory modal.')
        setOppDisconnect(true)
        setGameMode(false)
        setModalOpen(true)
        // stop timer
        // save drawing 
    }

    // Opp left
    const onOpponentQuit = (opponentId: string) => {
        console.log(`Opponent with the Id ${opponentId} left the room`);
        // stop timer
        // 
        navigate('/feed')
    }

    // I leave
    const onQuitGame = () => {
        socketService.emit('left-room')
        navigate('/feed')
    }

    const onSaveBoard = useCallback(async () => {
        if(!isHost || !isOppDisconnect) return
        console.log('saving')
        console.log('isHost', isHost)
        console.log('isOppDisconnect', isOppDisconnect)
        const drawingToSave = canvasService.createDrawing(playerCanvasRef.current, opponentImageRef.current, opponentUser)
        try {
            const savedDraw = await drawService.save(drawingToSave)
            dispatch(addDrawing(savedDraw))
        } catch (err) {
            console.log('err when saving drawing -', err);
        }
    }, [dispatch, isHost, isOppDisconnect, opponentUser])

    // Happens only when the time is up. not when someone quit or disconnect.
    const onGameEnd = useCallback(() => {
        setModalOpen(true)
        setGameMode(false)
        onSaveBoard()
    }, [onSaveBoard])

    const toggleEndModal = () => {
        setModalOpen(prevState => !prevState)
    }

    return <div className="game-page">
        {isGameEndModalOpen && <GameEndModal toggleModal={toggleEndModal} isOppDisconnect={isOppDisconnect} onSaveBoard={onSaveBoard}/>}
        <div className="game-content-conatiner">
            <GameHeader onGameEnd={onGameEnd} isOppDisconnect={isOppDisconnect} />
            <GameField isGameOn={isGameOn} opponentUser={opponentUser} playerCanvasRef={playerCanvasRef} opponentImageRef={opponentImageRef} />
            <button onClick={onQuitGame}>Cancel game</button>
        </div>
    </div>
}