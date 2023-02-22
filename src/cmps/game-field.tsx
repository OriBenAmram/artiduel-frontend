import { OpponentCanvas } from "./opponent-canvas"

import { PlayerCanvas } from "./player-canvas"

interface GameFieldProps {
    playerCanvasRef: any
    opponentImageRef: any
    opponentUser: any
    isGameOn: boolean
}

export function GameField({ isGameOn, opponentUser, playerCanvasRef, opponentImageRef }: GameFieldProps) {

    return <div className="game-field">
        <PlayerCanvas isGameOn={isGameOn} playerCanvasRef={playerCanvasRef} />
        <OpponentCanvas isGameOn={isGameOn} opponentUser={opponentUser} opponentImageRef={opponentImageRef}/>
    </div>
}