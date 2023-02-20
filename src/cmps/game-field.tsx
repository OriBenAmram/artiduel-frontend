import { useEffect } from "react"
import { OpponentCanvas } from "./opponent-canvas"

import { PlayerCanvas } from "./player-canvas"

interface GameFieldProps {
    playerCanvasRef: any
    opponentImageRef: any
    opponentUser: any
}

export function GameField({ opponentUser, playerCanvasRef, opponentImageRef }: GameFieldProps) {



    useEffect(() => {

    }, [])

    return <div className="game-field">
        <PlayerCanvas playerCanvasRef={playerCanvasRef} />
        <OpponentCanvas opponentUser={opponentUser} opponentImageRef={opponentImageRef}/>
    </div>
}