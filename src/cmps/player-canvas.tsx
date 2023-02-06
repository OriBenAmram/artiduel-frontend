import { useState, useEffect, useRef } from 'react'

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

// interface CanvasProps {
//     containerRef: HTMLDivElement | null
// }

export function PlayerCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isToolBarOpen, setToolBar] = useState(false)
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        setCanvas()
        console.log('here')
        // return () => {
        //     canvasRef.current = null
        //     ctxRef.current = null
        // }
    }, [])

    // Setting the canvas after initiating
    const setCanvas = () => {
        const canvas = canvasRef.current
        const containerRef = canvasContainerRef.current
        if (!canvas || !containerRef) return
        ctxRef.current = canvas.getContext('2d');
        let ctx = ctxRef.current; // Assigning to a temp variable
        canvas.width = containerRef.offsetWidth
        canvas.height = containerRef.offsetHeight
        ctx!.beginPath(); // Note the Non Null Assertion
        ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx!.stroke();
        console.log('storke circle')
    }

    return <div className="main-canvas-container" ref={canvasContainerRef}>
        <canvas ref={canvasRef}></canvas>
        <div className={`canvas-tool-bar ${isToolBarOpen ? 'open' : ''}`}>
            <div className="toggle-arrow-btn" onClick={() => setToolBar((prevState) => !prevState)}>
                <div className="icon">{isToolBarOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
            </div>
            {isToolBarOpen && <div className="circle"></div>}
        </div>
    </div>
}