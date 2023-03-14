import { useSelector } from "react-redux"
import { isScreenNarrow, selectedWord } from '../store/store';
import Timer from "./timer";

interface GameHeroSectionProps {
    onGameEnd: () => void
    isOppDisconnect: boolean
}

export function GameHeroSection({ onGameEnd, isOppDisconnect }: GameHeroSectionProps) {
    const gameWord = useSelector(selectedWord)
    const isNarrow = useSelector(isScreenNarrow)

    return <div className="game-hero-section">
        <div className="work-info">
            <Timer seconds={9000} onGameEnd={onGameEnd} isOppDisconnect={isOppDisconnect} />
            <div className="word-display">{gameWord ? gameWord : 'Default'}</div>
        </div>
        {isNarrow && <section className="opponent-section">
            <div className="opponent"></div>
        </section>}

        {/* Timer */}
        {/* Word */}

        {/* Opponent Box */}
    </div>
}