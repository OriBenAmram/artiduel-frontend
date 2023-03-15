import { useSelector } from "react-redux"
import { isScreenNarrow } from "../store/store"
import { OpponentCanvas } from "./opponent-canvas"

import { IOpponentMiniUser } from "../model/interfaces/IUser"

import { PlayerBoard } from "./player-board"

interface GameFieldProps {
    playerCanvasRef: { current: HTMLCanvasElement | null }
    opponentImageRef: { current: HTMLImageElement | null }
    opponentUser: IOpponentMiniUser
    isGameOn: boolean
}

export function GameField({ isGameOn, opponentUser, playerCanvasRef, opponentImageRef }: GameFieldProps) {
    const isNarrow = useSelector(isScreenNarrow)
    return <div className="game-field">
        <PlayerBoard isGameOn={isGameOn} playerCanvasRef={playerCanvasRef} isNarrow={isNarrow} />
        {!isNarrow && <OpponentCanvas isGameOn={isGameOn} opponentUser={opponentUser} opponentImageRef={opponentImageRef} />}
    </div>
}