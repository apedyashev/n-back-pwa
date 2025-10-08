import React, { useEffect, useState } from 'react';
import Controls from './components/Controls';
import Display from './components/Display';
import ModeToggle from './components/ModeToggle';
import NSelector from './components/NSelector';
import StatsBar from './components/StatsBar';
import useNBack from './hooks/useNBack';
import { playAudio } from './utils/audio';

const App: React.FC = () => {
    // Local UI state
    const [n, setN] = useState(2);
    const [mode, setMode] = useState<'letters' | 'shapes'>('letters');
    const [elapsed, setElapsed] = useState(0);
    const [matchRate, setMatchRate] = useState(0.3);

    // Game state from hook
    const { sequence, currentIndex, isPlaying, startGame, stopGame, score, currentItem, speedMs, setSpeedMs, canMatch, registerMatch } = useNBack(n, mode, { matchRate });

    // Start/stop audio + timer
    useEffect(() => {
        let t: number | null = null;
        if (isPlaying) {
            playAudio('start');
            setElapsed(0);
            t = window.setInterval(() => setElapsed((e) => e + 1), 1000) as unknown as number;
        } else {
            if (elapsed > 0) playAudio('end');
        }
        return () => {
            if (t) clearInterval(t);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    // Keyboard: Space to register a match
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!isPlaying || !canMatch) return;
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                const ok = registerMatch();
                playAudio(ok ? 'correct' : 'incorrect');
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isPlaying, canMatch, registerMatch]);

    // Apply mode changes immediately: restart if currently running so sequence regenerates with new mode
    useEffect(() => {
        if (isPlaying) {
            stopGame();
            // Next tick to allow state to settle
            setTimeout(() => startGame(), 0);
        }
        // If not playing, the next Start will pick up the new mode automatically
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    const handleStart = () => startGame();
    const handleStop = () => stopGame();
    const handleMatch = () => {
        const ok = registerMatch();
        playAudio(ok ? 'correct' : 'incorrect');
    };

    return (
        <div className="w-screen h-[100dvh] overflow-hidden bg-white text-gray-800">
            <main className="w-full h-full">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                    <div className="md:col-span-2 flex flex-col items-stretch gap-3 h-full px-2 md:px-3 py-2">
                        <Controls
                            isRunning={isPlaying}
                            onStart={handleStart}
                            onStop={handleStop}
                        />

                        <div className="w-full flex flex-col sm:flex-row items-stretch gap-3">
                            <div className="flex-1">
                                <NSelector n={n} setN={(value: number) => setN(value)} />
                            </div>
                            <ModeToggle mode={mode} setMode={(m: string) => setMode(m as 'letters' | 'shapes')} />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-xs text-gray-500">Speed: {speedMs} ms</label>
                            <input
                                type="range"
                                min={500}
                                max={3000}
                                step={100}
                                value={speedMs}
                                onChange={(e) => setSpeedMs(Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-xs text-gray-500">Match rate: {(matchRate * 100).toFixed(0)}%</label>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.05}
                                value={matchRate}
                                onChange={(e) => setMatchRate(Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>

                        {/* Bottom stack: StatsBar directly above Display */}
                        <div className="mt-auto space-y-2">
                            <StatsBar correctAnswers={score} totalAnswers={currentIndex} timeElapsed={elapsed} />
                            <Display currentItem={currentItem} onTap={handleMatch} disabled={!canMatch} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;