import { FC } from "react"
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

export const GameField: FC<GameFieldProps> = ({ isGameOn, opponentUser, playerCanvasRef, opponentImageRef }) => {
    const isNarrow = useSelector(isScreenNarrow)
    return <div className="game-field">
        <PlayerBoard isGameOn={isGameOn} playerCanvasRef={playerCanvasRef} isNarrow={isNarrow} />
        {!isNarrow && <OpponentCanvas isGameOn={isGameOn} opponentUser={opponentUser} opponentImageRef={opponentImageRef} />}
    </div>
}