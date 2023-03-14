import { useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';

import { PlayerToolbar } from './player-toolbar';

import { canvasService } from '../services/canvas.service';
import { socketService } from '../services/socket.service';
import { PlayerUserBar } from './player-user-bar';

interface PlayerBoardProps {
    playerCanvasRef: any
    isGameOn: boolean
}

export function PlayerBoard({ isGameOn, playerCanvasRef: canvasRef }: PlayerBoardProps) {

    const { roomId } = useParams()

    const canvasContainerRef = useRef<HTMLDivElement | null>(null);

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawSettingsRef = useRef<{ isDraw: boolean, isDrag: boolean, isErase: boolean }>({ isDraw: false, isDrag: false, isErase: false, })
    const brushRef = useRef<{ color: string, width: number }>({ color: 'black', width: 10 })


    const removeListeners = useCallback(() => {
        if (!canvasRef.current) return
        removeMouseListeners(canvasRef.current)
        removeTouchListeners(canvasRef.current)
        window.removeEventListener('resize', resizeCanvas);
    }, [])


    useEffect(() => {
        reJoinRoom()
        setCanvas()
        removeListeners()
        addListeners()
    }, [])

    useEffect(() => {
        if (!isGameOn) {
            removeListeners()
        }
    }, [isGameOn, removeListeners])

    const reJoinRoom = () => {
        socketService.emit('rejoin-room', roomId)
    }

    // Setting the canvas after initiating
    const setCanvas = () => {
        console.log('setting canvas')
        
        const canvas = canvasRef.current
        const containerRef = canvasContainerRef.current
        if (!canvas || !containerRef) return
        console.log('containerRef.offsetWidth:', containerRef.offsetWidth);
        console.log('containerRef.offsetHeight:', containerRef.offsetHeight);
        
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

    return <div className="player-board" ref={canvasContainerRef}>
        <PlayerUserBar />
        <div className="canvas-container" ref={canvasContainerRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
        <PlayerToolbar clearCanvas={clearCanvas} drawSettingsRef={drawSettingsRef.current} brushRef={brushRef.current} />
    </div>
}