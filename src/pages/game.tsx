import { useEffect } from 'react'
import { useParams } from "react-router-dom"
export function Game() {
    const { roomId } = useParams()

    useEffect(() => {
    }, [])
    console.log('roomId from params:', roomId);

    return <div className="game-page">
        <h1>Room with id: {roomId}</h1>
    </div>
}