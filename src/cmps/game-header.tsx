import { useSelector } from "react-redux"
import { selectedWord} from '../store/store';
import Timer from "./timer";

interface GameHeaderProps {
    onGameEnd: () => void
    isOppDisconnect: boolean
}

export function GameHeader({ onGameEnd, isOppDisconnect }: GameHeaderProps) {
    const gameWord = useSelector(selectedWord)

    return <div className="game-header">

        <div className="work-info">
            <div className="word-display">{gameWord}</div>
            <h4>Draw the displayed word!</h4>
        </div>
        <div className="timer-box">< Timer seconds={90} onGameEnd={onGameEnd} isOppDisconnect={isOppDisconnect}/></div>
        {/* <button onClick={onSaveBoard}>Save</button> */}
    </div>
}