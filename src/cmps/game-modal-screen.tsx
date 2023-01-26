import { useState, MouseEvent } from 'react'

import { MdClose } from 'react-icons/md'

interface GameModalProps {
    toggleMenu: () => void
}

export function GameModalScreen({ toggleMenu }: GameModalProps) {
    const [level, setLevel] = useState('Easy')

    const onClickModal = (ev: MouseEvent) => {
        ev.stopPropagation()
        console.log('modal')
    }

    return <div className={`screen-overlay`} onClick={toggleMenu}>
        <div className="game-modal" onClick={onClickModal}>
            <button className="close-btn" onClick={toggleMenu}><MdClose className='icon' /></button>
            <h2>Draw to win!</h2>
            <div className="level-display">{level}</div>
            <div className="level-options">
                <button onClick={() => setLevel('Easy')}>Easy</button>
                <button onClick={() => setLevel('Meduim')}>Medium</button>
                <button onClick={() => setLevel('Hard')}>Hard</button>
            </div>
            <button className="primary-btn">Start Game</button>
            <button className="alternative-opt-btn">Against friends</button>
        </div>
    </div>
}