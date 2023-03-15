import { useEffect } from "react"
import { IOpponentMiniUser } from "../model/interfaces/IUser"
import { canvasService } from "../services/canvas.service"

import { socketService } from "../services/socket.service"

interface opponentCanvasProps {
    isGameOn: boolean
    opponentUser: IOpponentMiniUser
    opponentImageRef: { current: HTMLImageElement | null }
}

export function OpponentCanvas({ isGameOn, opponentUser, opponentImageRef }: opponentCanvasProps) {

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
        if(opponentImageRef.current) opponentImageRef.current.src = dataURL
    }


    return <div className="secondary-canvas-container">
        <img src="" alt="your opponent canvas" ref={opponentImageRef} />
    </div>
}