import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { setGameSetting, setOpponent } from "../store/slicers/game.slice"

import { socketService } from "../services/socket.service"
import { userService } from "../services/user.service"


export function WaitingRoom() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on('matched-opponent', onMatchedOpponent)

        return (() => {
            socketService.off('matched-opponent')
        })
    })

    const onMatchedOpponent = async ({ roomId, isHost, opponentPlayer }: { roomId: string, isHost: boolean, opponentPlayer: { id: string, fullname: string } }) => {
        await dispatch(setGameSetting(opponentPlayer))
        userService.saveOpponent(opponentPlayer)
        navigate(`/game/${roomId}`)
    }

    return <div className="waiting-room-page">
        <h1>Waiting room</h1>
    </div>
}