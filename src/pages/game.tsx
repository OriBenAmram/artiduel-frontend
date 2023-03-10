import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { selectedIsHost, selectedOpponent } from '../store/store'
import { addDrawing } from '../store/slicers/draw.slice'

import { GameField } from '../cmps/game-field'
import { GameHeader } from '../cmps/game-header'
import { DynamicGameModal } from '../cmps/dynamic-game-modal'

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

    const [DynamicGameModalSettings, setModalSettings] = useState({ isOpen: false, type: '' })
    const [isGameOn, setGameMode] = useState(true)
    const [isOppDisconnect, setOppDisconnect] = useState(false)
    const [isOppQuit, setOppQuit] = useState(false)

    useEffect(() => {
        socketService.on('opponent-disconnect', onOpponentDisconnect)
        socketService.on('opponent-quit', onOpponentQuit)

        return (() => {
            socketService.off('opponent-disconnect')
            socketService.off('opponent-quit')
            // Should also empty store
            canvasService.emptyCanvasFromStorage()
        })
    }, [])

    // Opp disconnect
    const onOpponentDisconnect = () => {
        console.log('sorry he quited. should stop time and show a victory modal.')
        setOppDisconnect(true)
        setGameMode(false)
        setGameModalSettings({ isOpen: true, type: 'game-end' })
    }

    // Opp left
    const onOpponentQuit = (opponentId: string) => {
        console.log(`Opponent with the Id ${opponentId} left the room`);
        setGameMode(false)
        setOppQuit(true)
        setGameModalSettings({ isOpen: true, type: 'game-end' })
    }

    // I leave
    const onQuitGame = () => {
        setGameMode(false)
        socketService.emit('left-room')
        toggleGameModal()
        navigate('/feed')
    }

    const onSaveBoard = useCallback(async () => {
        console.log('isOppQuit:', isOppQuit);
        console.log('isOppDisconnect:', isOppDisconnect);
        console.log('isHost:', isHost);

        if (!isHost && !isOppDisconnect && !isOppQuit) {
            console.log('didnt save')
            return
        }
        console.log('saving')
        const drawingToSave = canvasService.createDrawing(playerCanvasRef.current, opponentImageRef.current, opponentUser)
        try {
            const savedDraw = await drawService.save(drawingToSave)
            dispatch(addDrawing(savedDraw))
        } catch (err) {
            console.log('err when saving drawing -', err);
        }
    }, [dispatch, isHost, isOppDisconnect, isOppQuit, opponentUser])

    // Happens only when the time is up. not when someone quit or disconnect.
    const onGameEnd = useCallback(() => {
        setGameModalSettings({ isOpen: true, type: 'game-end' })
        setGameMode(false)
        onSaveBoard()
    }, [onSaveBoard])

    const toggleGameModal = () => {
        setModalSettings(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
    }

    const setGameModalSettings = ({ isOpen, type }: { isOpen: boolean, type: string }) => {
        setModalSettings(prevState => ({ ...prevState, isOpen, type }))
    }

    return <div className="game-page">
        {DynamicGameModalSettings.isOpen && <DynamicGameModal type={DynamicGameModalSettings.type} onQuitGame={onQuitGame} toggleModal={toggleGameModal} isOppDisconnect={isOppDisconnect} isOppQuit={isOppQuit} onSaveBoard={onSaveBoard} />}
        <div className="game-content-conatiner">
            <GameHeader setGameModalSettings={setGameModalSettings} onGameEnd={onGameEnd} isOppDisconnect={isOppDisconnect} />
            <GameField isGameOn={isGameOn} opponentUser={opponentUser} playerCanvasRef={playerCanvasRef} opponentImageRef={opponentImageRef} />
        </div>
    </div>
}