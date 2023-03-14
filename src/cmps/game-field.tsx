import { useSelector } from "react-redux"
import { isScreenNarrow } from "../store/store"
import { OpponentCanvas } from "./opponent-canvas"

import { PlayerBoard } from "./player-board"

interface GameFieldProps {
    playerCanvasRef: any
    opponentImageRef: any
    opponentUser: any
    isGameOn: boolean
}

export function GameField({ isGameOn, opponentUser, playerCanvasRef, opponentImageRef }: GameFieldProps) {
    const isNarrow = useSelector(isScreenNarrow)
    return <div className="game-field">
        <PlayerBoard isGameOn={isGameOn} playerCanvasRef={playerCanvasRef} />
        {!isNarrow && <OpponentCanvas isGameOn={isGameOn} opponentUser={opponentUser} opponentImageRef={opponentImageRef} />}
    </div>
}