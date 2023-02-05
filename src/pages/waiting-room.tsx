import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

import { socketService } from "../services/socket.service"

export function WaitingRoom() { 
    const navigate = useNavigate()

    useEffect(() => { 
        socketService.on('matched-opponent', onMatchedOpponent)

        return (() => { 
            socketService.off('matched-opponent')
        })
    })

    const onMatchedOpponent = (roomId : string) => { 
        console.log('roomId going to:', roomId);
        navigate(`/game/${roomId}`)
    }

    return <div className="waiting-room-page">
        <h1>Waiting room</h1>
    </div>
}