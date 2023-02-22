import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { setWord, setOpponent, setGameSettings } from "../store/slicers/game.slice"

import { socketService } from "../services/socket.service"
import { userService } from "../services/user.service"

interface IGameSettings {
    roomId: string
    word: string
    isHost: boolean
    level: string
    opponentPlayer: { id: string, fullname: string }
}


export function WaitingRoom() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on('matched-opponent', onMatchedOpponent)

        return (() => {
            socketService.off('matched-opponent')
        })
    })

    const onMatchedOpponent = ({ roomId, isHost, level, word, opponentPlayer }: IGameSettings) => {
        userService.saveOpponent(opponentPlayer)
        dispatch(setGameSettings({ opponentPlayer, isHost, word }))
        navigate(`/game/${roomId}`)
    }

    return <div className="waiting-room-page">
        <h1>Waiting room</h1>
    </div>
}