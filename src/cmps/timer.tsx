import { useState, useEffect, useRef } from 'react';

interface TimerProps {
    seconds: number;
    onGameEnd: () => void
    isOppDisconnect: boolean
}

export const Timer: React.FC<TimerProps> = ({ seconds, onGameEnd, isOppDisconnect }) => {
    const [timeRemaining, setTimeRemaining] = useState(seconds);
    let timerIntervalId = useRef<any>(null)

    useEffect(() => {
        console.log('mount')
        startTimer()
        return () => {
            console.log('unmount')
            clearInterval(timerIntervalId.current);
        };
    }, []);

    useEffect(() => {
        if (isOppDisconnect) {
            console.log('clearing interval - isOppDisconnect', isOppDisconnect)
            clearInterval(timerIntervalId.current);
        }
    }, [isOppDisconnect])

    useEffect(() => {
        if (timeRemaining === 0) {
            clearInterval(timerIntervalId.current);
            console.log('onGameEnd - saving drawing!@')
            onGameEnd()
            return
        }
    }, [timeRemaining, onGameEnd])

    const startTimer = () => {
        timerIntervalId.current = setInterval(() => {
            // if (timeRemaining === 0) {
            //     clearInterval(timerIntervalId.current);
            //     onGameEnd()
            //     return
            // }
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
        }, 1000);
    }

    const formatTime = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const minutesToDisplay = minutes.toString().padStart(2, '0')
        const secondsToDisplay = seconds.toString().padStart(2, '0')
        return <div className="timer">
            <div className="timer__minutes">{minutesToDisplay}:</div>
            <div className={`timer__seconds${timeRemaining < 10 ? "--times-up" : ""}`}>{secondsToDisplay}</div>
        </div>
    };

    return <div>{formatTime()}</div>;
};

export default Timer;
