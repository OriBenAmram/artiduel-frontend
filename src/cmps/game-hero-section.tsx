import { useEffect } from "react";
import { useSelector } from "react-redux"

import Timer from "./timer";

import { isScreenNarrow, selectedWord } from '../store/store';

import { canvasService } from "../services/canvas.service";
import { socketService } from "../services/socket.service";

import { IOpponentMiniUser } from "../model/interfaces/IUser";

interface GameHeroSectionProps {
    onGameEnd: () => void
    isOppDisconnect: boolean
    opponentUser: IOpponentMiniUser
    opponentImageRef: { current: HTMLImageElement | null }
}

export function GameHeroSection({ onGameEnd, isOppDisconnect, opponentUser, opponentImageRef }: GameHeroSectionProps) {
    const gameWord = useSelector(selectedWord)
    const isNarrow = useSelector(isScreenNarrow)
    console.log('opponentImageRef:', opponentImageRef);


    useEffect(() => {
        setOpponentImage()
        socketService.on('opponent-canvas-change', onOpponentChange)
        window.addEventListener('resize', setOpponentImage);
        return (() => {
            socketService.off('opponent-canvas-change')
            window.addEventListener('resize', setOpponentImage);
        })
    }, [])

    const setOpponentImage = () => {
        if (!opponentImageRef?.current) return
        const imageSrc = canvasService.getOpponentImageSrc()
        opponentImageRef.current.src = imageSrc
    }

    const onOpponentChange = (dataURL: string) => {
        canvasService.saveOpponentImage(dataURL)
        if(opponentImageRef?.current) opponentImageRef.current.src = dataURL
    }

    return <div className="game-hero-section">
        <div className="work-info">
            <Timer seconds={550} onGameEnd={onGameEnd} isOppDisconnect={isOppDisconnect} />
            <div className="word-display">{gameWord ? gameWord : 'Default'}</div>
        </div>
        {isNarrow && <div className="opponent-board">
            <img src="" alt="your opponent canvas" ref={opponentImageRef} />
        </div>}
    </div>
}