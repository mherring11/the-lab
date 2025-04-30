import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
const HIITTimer = ({ className = '' }) => {
    // Timer settings
    const [workSeconds, setWorkSeconds] = useState(30);
    const [restSeconds, setRestSeconds] = useState(15);
    const [rounds, setRounds] = useState(8);
    const [prepareSeconds, setPrepareSeconds] = useState(10);
    // Timer state
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState('prepare');
    const [currentRound, setCurrentRound] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(prepareSeconds);
    const [totalTime, setTotalTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    // Audio refs
    const beepRef = useRef(null);
    const startRef = useRef(null);
    const completeRef = useRef(null);
    // Calculate total workout time
    useEffect(() => {
        const total = prepareSeconds + (rounds * (workSeconds + restSeconds)) - restSeconds;
        setTotalTime(total);
        resetTimer();
    }, [workSeconds, restSeconds, rounds, prepareSeconds]);
    // Timer effect
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeRemaining(time => {
                    if (time <= 1) {
                        // Time to change phases
                        handlePhaseChange();
                        return 0;
                    }
                    return time - 1;
                });
                setElapsedTime(time => time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentPhase, currentRound, rounds]);
    // Sound effects for timer transitions
    useEffect(() => {
        if (timeRemaining === 3 && isRunning && currentPhase !== 'complete') {
            beepRef.current?.play();
        }
    }, [timeRemaining, isRunning, currentPhase]);
    const handlePhaseChange = () => {
        // Play sound
        if (beepRef.current) {
            beepRef.current.play();
        }
        // Change phase based on current state
        if (currentPhase === 'prepare') {
            setCurrentPhase('work');
            setTimeRemaining(workSeconds);
            startRef.current?.play();
        }
        else if (currentPhase === 'work') {
            if (currentRound === rounds) {
                setCurrentPhase('complete');
                setIsRunning(false);
                completeRef.current?.play();
            }
            else {
                setCurrentPhase('rest');
                setTimeRemaining(restSeconds);
            }
        }
        else if (currentPhase === 'rest') {
            setCurrentRound(round => round + 1);
            setCurrentPhase('work');
            setTimeRemaining(workSeconds);
            startRef.current?.play();
        }
    };
    const startTimer = () => {
        if (currentPhase === 'complete') {
            resetTimer();
        }
        setIsRunning(true);
        if (currentPhase === 'prepare') {
            startRef.current?.play();
        }
    };
    const pauseTimer = () => {
        setIsRunning(false);
    };
    const resetTimer = () => {
        setIsRunning(false);
        setCurrentPhase('prepare');
        setCurrentRound(1);
        setTimeRemaining(prepareSeconds);
        setElapsedTime(0);
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const getProgressPercentage = () => {
        if (totalTime === 0)
            return 0;
        return (elapsedTime / totalTime) * 100;
    };
    // Helper to get color based on current phase
    const getPhaseColors = () => {
        switch (currentPhase) {
            case 'prepare': return {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                border: 'border-yellow-300',
                ring: 'ring-yellow-400',
                button: 'bg-yellow-500 hover:bg-yellow-600'
            };
            case 'work': return {
                bg: 'bg-red-100',
                text: 'text-red-800',
                border: 'border-red-300',
                ring: 'ring-red-400',
                button: 'bg-red-500 hover:bg-red-600'
            };
            case 'rest': return {
                bg: 'bg-green-100',
                text: 'text-green-800',
                border: 'border-green-300',
                ring: 'ring-green-400',
                button: 'bg-green-500 hover:bg-green-600'
            };
            case 'complete': return {
                bg: 'bg-blue-100',
                text: 'text-blue-800',
                border: 'border-blue-300',
                ring: 'ring-blue-400',
                button: 'bg-blue-500 hover:bg-blue-600'
            };
            default: return {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                border: 'border-gray-300',
                ring: 'ring-gray-400',
                button: 'bg-gray-500 hover:bg-gray-600'
            };
        }
    };
    const colors = getPhaseColors();
    return (_jsxs("div", { className: `bg-white shadow-md rounded-lg p-6 ${className}`, children: [_jsx("audio", { ref: beepRef, src: "/sounds/beep.mp3" }), _jsx("audio", { ref: startRef, src: "/sounds/start.mp3" }), _jsx("audio", { ref: completeRef, src: "/sounds/complete.mp3" }), _jsxs("h2", { className: "text-lg font-semibold text-gray-800 mb-4 flex items-center", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-blue-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }), "HIIT Timer"] }), _jsx("div", { className: `${colors.bg} ${colors.border} border-2 rounded-lg p-6 mb-4 transition-colors duration-300`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm uppercase font-bold tracking-wide mb-1 text-gray-500", children: currentPhase === 'prepare' ? 'Get Ready' :
                                currentPhase === 'work' ? 'WORK!' :
                                    currentPhase === 'rest' ? 'REST' : 'COMPLETE' }), _jsx("div", { className: `text-5xl font-bold mb-2 ${colors.text}`, children: formatTime(timeRemaining) }), _jsxs("div", { className: "text-sm text-gray-500 mb-3", children: ["Round ", currentRound, " of ", rounds] }), _jsx("div", { className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full transition-all duration-1000 ease-linear`, style: {
                                    width: `${getProgressPercentage()}%`,
                                    backgroundColor: currentPhase === 'work' ? '#ef4444' :
                                        currentPhase === 'rest' ? '#10b981' : '#3b82f6'
                                } }) })] }) }), _jsxs("div", { className: "flex justify-center space-x-3 mb-6", children: [!isRunning ? (_jsx("button", { onClick: startTimer, className: "flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors", children: _jsx(PlayIcon, { className: "h-6 w-6" }) })) : (_jsx("button", { onClick: pauseTimer, className: "flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-colors", children: _jsx(PauseIcon, { className: "h-6 w-6" }) })), _jsx("button", { onClick: resetTimer, className: "flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors", children: _jsx(ArrowPathIcon, { className: "h-6 w-6" }) })] }), _jsxs("div", { className: "space-y-4 border-t border-gray-200 pt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Work Interval (seconds)" }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "range", min: "10", max: "120", step: "5", value: workSeconds, onChange: (e) => setWorkSeconds(Number(e.target.value)), className: "flex-grow mr-2", disabled: isRunning }), _jsx("span", { className: "text-sm font-medium w-10 text-right", children: workSeconds })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Rest Interval (seconds)" }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "range", min: "5", max: "60", step: "5", value: restSeconds, onChange: (e) => setRestSeconds(Number(e.target.value)), className: "flex-grow mr-2", disabled: isRunning }), _jsx("span", { className: "text-sm font-medium w-10 text-right", children: restSeconds })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Rounds" }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "range", min: "1", max: "20", step: "1", value: rounds, onChange: (e) => setRounds(Number(e.target.value)), className: "flex-grow mr-2", disabled: isRunning }), _jsx("span", { className: "text-sm font-medium w-10 text-right", children: rounds })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Preparation Time (seconds)" }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "range", min: "0", max: "30", step: "5", value: prepareSeconds, onChange: (e) => setPrepareSeconds(Number(e.target.value)), className: "flex-grow mr-2", disabled: isRunning }), _jsx("span", { className: "text-sm font-medium w-10 text-right", children: prepareSeconds })] })] }), _jsxs("div", { className: "text-sm text-gray-500 pt-2", children: ["Total workout time: ", formatTime(totalTime)] })] })] }));
};
export default HIITTimer;
