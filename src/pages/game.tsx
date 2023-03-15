import { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { GameHeader } from '../cmps/game-header'
import { GameHeroSection } from '../cmps/game-hero-section'
import { GameField } from '../cmps/game-field'
import { DynamicGameModal } from '../cmps/dynamic-game-modal'

import { selectedIsHost, selectedOpponent, selectedWord } from '../store/store'
import { addDrawing } from '../store/slicers/draw.slice'

import { IDynamicModalState } from '../model/interfaces/IGame'

import { canvasService } from '../services/canvas.service'
import { socketService } from '../services/socket.service'
import { drawService } from '../services/draw.service'


export function Game() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const opponentUser = useSelector(selectedOpponent)
    const isHost = useSelector(selectedIsHost)
    const word = useSelector(selectedWord)

    const playerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const opponentImageRef = useRef<HTMLImageElement | null>(null);

    const [DynamicGameModalSettings, setModalSettings] = useState<IDynamicModalState>({ isOpen: false, type: '' })
    const [isGameOn, setGameMode] = useState<boolean>(true)
    const [isOppDisconnect, setOppDisconnect] = useState<boolean>(false)
    const [isOppQuit, setOppQuit] = useState<boolean>(false)


    // Opp disconnect
    const onOpponentDisconnect = useCallback(() => {
        console.log('sorry he quited. should stop time and show a victory modal.')
        setOppDisconnect(true)
        setGameMode(false)
        setGameModalSettings({ isOpen: true, type: 'game-end' })
    }, [])

    // Opp left
    const onOpponentQuit = useCallback((opponentId: string) => {
        console.log(`Opponent with the Id ${opponentId} left the room`);
        setGameMode(false)
        setOppQuit(true)
        setGameModalSettings({ isOpen: true, type: 'game-end' })
    }, [])

    useEffect(() => {
        socketService.on('opponent-disconnect', onOpponentDisconnect)
        socketService.on('opponent-quit', onOpponentQuit)

        return (() => {
            socketService.off('opponent-disconnect')
            socketService.off('opponent-quit')
            // Should also empty store
            canvasService.emptyCanvasFromStorage()
        })
    }, [onOpponentDisconnect, onOpponentQuit])


    // When the user leaves
    const onQuitGame = () => {
        setGameMode(false)
        socketService.emit('left-room')
        toggleGameModal()
        navigate('/feed')
    }

    const onSaveBoard = useCallback(async () => {
        if (!isHost && !isOppDisconnect && !isOppQuit) {
            console.log('didnt save')
            return
        }
        const drawingToSave = canvasService.createDrawing(playerCanvasRef.current, opponentImageRef.current, opponentUser, word)
        try {
            const savedDraw = await drawService.save(drawingToSave)
            dispatch(addDrawing(savedDraw))
        } catch (err) {
            console.log('err when saving drawing -', err);
        }
    }, [dispatch, isHost, isOppDisconnect, isOppQuit, opponentUser, word])

    // Happens only when the time is up. not when someone quit or disconnect.
    const onGameEnd = useCallback(() => {
        setGameModalSettings({ isOpen: true, type: 'game-end' })
        setGameMode(false)
        onSaveBoard()
    }, [onSaveBoard])

    const toggleGameModal = () => {
        setModalSettings(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
    }

    const setGameModalSettings = ({ isOpen, type }: IDynamicModalState) => {
        setModalSettings(prevState => ({ ...prevState, isOpen, type }))
    }

    return <div className="game-page">
        {DynamicGameModalSettings.isOpen && <DynamicGameModal type={DynamicGameModalSettings.type} onQuitGame={onQuitGame} toggleModal={toggleGameModal} isOppDisconnect={isOppDisconnect} isOppQuit={isOppQuit} onSaveBoard={onSaveBoard} />}

        <GameHeader setGameModalSettings={setGameModalSettings} />
        <div className="game-content-conatiner">
            <GameHeroSection onGameEnd={onGameEnd} isOppDisconnect={isOppDisconnect} opponentUser={opponentUser} opponentImageRef={opponentImageRef} />
            <GameField isGameOn={isGameOn} opponentUser={opponentUser} playerCanvasRef={playerCanvasRef} opponentImageRef={opponentImageRef} />
        </div>
    </div>
}