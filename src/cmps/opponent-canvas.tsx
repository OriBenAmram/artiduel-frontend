import { useEffect, useCallback, FC } from "react"
import { IOpponentMiniUser } from "../model/interfaces/IUser"
import { canvasService } from "../services/canvas.service"

import { socketService } from "../services/socket.service"

interface opponentCanvasProps {
    isGameOn: boolean
    opponentUser: IOpponentMiniUser
    opponentImageRef: { current: HTMLImageElement | null }
}

export const OpponentCanvas: FC<opponentCanvasProps> = ({ isGameOn, opponentUser, opponentImageRef }) => {


    const setOpponentImage = useCallback((): void => {
        if (!opponentImageRef?.current) return
        const imageSrc = canvasService.getOpponentImageSrc()
        opponentImageRef.current.src = imageSrc
    }, [opponentImageRef])

    const onOpponentChange = useCallback((dataURL: string): void => {
        canvasService.saveOpponentImage(dataURL)
        if (opponentImageRef.current) opponentImageRef.current.src = dataURL
    }, [opponentImageRef])

    useEffect(() => {
        setOpponentImage()
        socketService.on('opponent-canvas-change', onOpponentChange)
        window.addEventListener('resize', setOpponentImage);
        return (() => {
            socketService.off('opponent-canvas-change')
            window.addEventListener('resize', setOpponentImage);
        })
    }, [onOpponentChange, setOpponentImage])


    return <div className="secondary-canvas-container">
        <img src="" alt="your opponent canvas" ref={opponentImageRef} />
    </div>
}