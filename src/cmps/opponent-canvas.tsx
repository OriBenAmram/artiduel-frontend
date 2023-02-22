import { useEffect } from "react"
import { canvasService } from "../services/canvas.service"

import { socketService } from "../services/socket.service"

interface opponentCanvasProps {
    opponentImageRef: any
    opponentUser: any
    isGameOn: boolean
}

export function OpponentCanvas({ isGameOn, opponentUser, opponentImageRef}: opponentCanvasProps) {

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
        if(!opponentImageRef?.current) return
        const imageSrc = canvasService.getOpponentImageSrc()
        opponentImageRef.current.src = imageSrc
    }

    const onOpponentChange = (dataURL: string) => {
        canvasService.saveOpponentImage(dataURL)
        opponentImageRef.current.src = dataURL
    }


    return <div className="secondary-canvas-container">
        <img src="" alt="your opponent canvas" ref={opponentImageRef} />
    </div>
}