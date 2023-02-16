import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';

import { PlayerToolbar } from './player-toolbar';

import { canvasService } from '../services/canvas.service';
import { socketService } from '../services/socket.service';

interface PlayerCanvasProps {
    playerCanvasRef: any
}

export function PlayerCanvas({ playerCanvasRef: canvasRef }: PlayerCanvasProps) {

    const [isToolBarOpen, setToolBar] = useState(false)

    const { roomId } = useParams()

    const canvasContainerRef = useRef<HTMLDivElement | null>(null);

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawSettingsRef = useRef<{ isDraw: boolean, isDrag: boolean, isErase: boolean }>({ isDraw: false, isDrag: false, isErase: false, })
    const brushRef = useRef<{ color: string, width: number }>({ color: 'black', width: 10 })

    useEffect(() => {
        reJoinRoom()
        setCanvas()
        removeListeners()
        addListeners()
    }, [])

    const reJoinRoom = () => {
        socketService.emit('rejoin-room', roomId)
    }

    // Setting the canvas after initiating
    const setCanvas = () => {
        const canvas = canvasRef.current
        const containerRef = canvasContainerRef.current
        if (!canvas || !containerRef) return
        ctxRef.current = canvas.getContext('2d');
        canvas.width = containerRef.offsetWidth
        canvas.height = containerRef.offsetHeight
        canvasService.loadPlayerCanvas(canvas, ctxRef.current)
    }

    const addListeners = () => {
        if (!canvasRef.current) return
        addMouseListeners(canvasRef.current)
        addTouchListeners(canvasRef.current)
        window.addEventListener('resize', resizeCanvas);
    }

    function addMouseListeners(canvas: HTMLCanvasElement) {
        canvas.addEventListener('mousedown', onDown)
        canvas.addEventListener('mousemove', onMove)
        canvas.addEventListener('mouseup', onUp)
    }

    function addTouchListeners(canvas: HTMLCanvasElement) {
        canvas.addEventListener('touchstart', onDown)
        canvas.addEventListener('touchmove', onMove)
        canvas.addEventListener('touchend', onUp)
    }

    const removeListeners = () => {
        if (!canvasRef.current) return
        removeMouseListeners(canvasRef.current)
        removeTouchListeners(canvasRef.current)
        window.removeEventListener('resize', resizeCanvas);
    }

    function removeMouseListeners(canvas: HTMLCanvasElement) {
        canvas.removeEventListener('mousedown', onDown)
        canvas.removeEventListener('mousemove', onMove)
        canvas.removeEventListener('mouseup', onUp)
    }

    function removeTouchListeners(canvas: HTMLCanvasElement) {
        canvas.removeEventListener('touchstart', onDown)
        canvas.removeEventListener('touchmove', onMove)
        canvas.removeEventListener('touchend', onUp)
    }

    const resizeCanvas = () => {
        setCanvas()
    }

    // Drawing
    const onDown = (ev: any) => {
        drawSettingsRef.current.isDraw = true
        canvasService.setStartPoint(ev, ctxRef.current)
    }

    const onMove = (ev: any) => {
        if (!drawSettingsRef.current.isDraw) return
        canvasService.pencilDraw(ev, ctxRef.current, brushRef.current)
        ev.preventDefault()
    }

    const onUp = () => {
        drawSettingsRef.current.isDraw = false
        ctxRef.current?.stroke()
        ctxRef.current?.closePath()
        canvasService.savePlayerCanvas(canvasRef.current)
    }

    const clearCanvas = () => {
        if (ctxRef.current && canvasRef.current) {
            ctxRef.current?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)
            canvasService.drawBgcColor(canvasRef.current, ctxRef.current, 'white')
            canvasService.savePlayerCanvas(canvasRef.current)
        }
    }

    return <div className="main-canvas-container" ref={canvasContainerRef}>
        <canvas ref={canvasRef}></canvas>
        <PlayerToolbar clearCanvas={clearCanvas} isToolBarOpen={isToolBarOpen} setToolBar={setToolBar} drawSettingsRef={drawSettingsRef.current} brushRef={brushRef.current} />
    </div>
}