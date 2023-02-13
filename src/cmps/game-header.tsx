
interface GameHeaderProps {
    onSaveBoard: () => void
}

export function GameHeader({ onSaveBoard }: GameHeaderProps) {

    return <div className="game-header">
        <div className="work-info">
            <div className="word-display">Elephant</div>
            <h4>Draw the displayed word!</h4>
        </div>
        <div className="timer-box">07:42</div>
        <button onClick={onSaveBoard}>Save</button>
    </div>
}