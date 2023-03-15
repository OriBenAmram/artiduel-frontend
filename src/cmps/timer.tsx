import { useState, useEffect, useRef } from 'react';

interface TimerProps {
    seconds: number;
    onGameEnd: () => void
    isOppDisconnect: boolean
}

export const Timer: React.FC<TimerProps> = ({ seconds, onGameEnd, isOppDisconnect }) => {
    const [timeRemaining, setTimeRemaining] = useState(seconds);
    let timerIntervalId = useRef<null | NodeJS.Timeout>(null)

    useEffect(() => {
        startTimer()
        return () => {
            if(timerIntervalId.current) clearInterval(timerIntervalId.current);
        };
    }, []);

    useEffect(() => {
        if (isOppDisconnect && timerIntervalId.current) {
            clearInterval(timerIntervalId.current);
        }
    }, [isOppDisconnect])

    useEffect(() => {
        if (timeRemaining === 0 && timerIntervalId.current) {
            clearInterval(timerIntervalId.current);
            onGameEnd()
            return
        }
    }, [timeRemaining, onGameEnd])

    const startTimer = () => {
        timerIntervalId.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
        }, 1000);
    }

    const formatTime = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const minutesToDisplay = minutes.toString().padStart(2, '0')
        const secondsToDisplay = seconds.toString().padStart(2, '0')
        return <div className="timer">
            <div className="left-bell bell"></div>
            <div className="right-bell bell"></div>
            <div className="timer__minutes">{minutesToDisplay}:</div>
            <div className={`timer__seconds${timeRemaining < 10 ? "--times-up" : ""}`}>{secondsToDisplay}</div>
        </div>
    };

    return <div className="time-display">{formatTime()}</div>;
};

export default Timer;
