import { useEffect, useRef } from "react"
import { canvasService } from "../services/canvas.service"

import { socketService } from "../services/socket.service"

interface opponentCanvasProps { 
    opponentCanvasRef: any
    opponentUser: any
}

export function OpponentCanvas({ opponentUser, opponentCanvasRef : canvasRef } : opponentCanvasProps) {

    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        setCanvas()
        socketService.on('opponent-canvas-change', onOpponentChange)
        window.addEventListener('resize', setCanvas);
        return (() => {
            socketService.off('opponent-canvas-change')
            window.addEventListener('resize', setCanvas);
        })
    }, [])

    const setCanvas = () => {
        const canvas = canvasRef.current
        const containerRef = canvasContainerRef.current
        if (!canvas || !containerRef) return
        ctxRef.current = canvas.getContext('2d');
        canvas.width = containerRef.offsetWidth
        canvas.height = containerRef.offsetHeight
        canvasService.loadOpponentCanvas(canvas, ctxRef.current)
    }

    const onOpponentChange = (dataURL: string) => {
        canvasService.saveOpponentCanvas(canvasRef.current, ctxRef.current, dataURL)
    }
    console.log('Your are playing against ', opponentUser.fullname);
    

    return <div className="secondary-canvas-container" ref={canvasContainerRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
}