import { useState, useEffect, useRef } from "react"

import { PlayerCanvas } from "./player-canvas"

export function GameField() {



    useEffect(() => {

    }, [])

    return <div className="game-field">
        <PlayerCanvas />
        <div className="secondary-canvas-container"></div>
    </div>
}