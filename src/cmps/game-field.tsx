import { useEffect } from "react"
import { OpponentCanvas } from "./opponent-canvas"

import { PlayerCanvas } from "./player-canvas"

interface GameFieldProps {
    playerCanvasRef: any
    opponentCanvasRef: any
    opponentUser: any
}

export function GameField({ opponentUser, playerCanvasRef, opponentCanvasRef }: GameFieldProps) {



    useEffect(() => {

    }, [])

    return <div className="game-field">
        <PlayerCanvas playerCanvasRef={playerCanvasRef} />
        <OpponentCanvas opponentUser={opponentUser} opponentCanvasRef={opponentCanvasRef}/>
    </div>
}