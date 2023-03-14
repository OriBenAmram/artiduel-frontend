import { IoArrowForwardSharp } from 'react-icons/io5'
import { FaSignal } from 'react-icons/fa'

interface GameHeaderProps {
    setGameModalSettings: any
}

export function GameHeader({ setGameModalSettings}: GameHeaderProps) {
    return <div className="game-header">
        <span className="connection-indication"><FaSignal className="icon" title="connection signal" /></span>
        <div className="logo" title="Game Logo">ArtiDuel</div>
        <button className="cancel-back-btn" title="Go back"><IoArrowForwardSharp className="icon" onClick={() => setGameModalSettings({ isOpen: true, type: 'cancel-game' })} /></button>
    </div>
}