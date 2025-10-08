import { useEffect, useMemo, useRef, useState } from 'react';
import { generateSequence as generateNBackSequence } from '../game/sequences';

const DEFAULT_LENGTH = 50;

const useNBack = (
    n: number,
    mode: 'letters' | 'shapes',
    options?: { length?: number; matchRate?: number }
) => {
    const [sequence, setSequence] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speedMs, setSpeedMs] = useState(2000); // pacing between items

    const length = options?.length ?? DEFAULT_LENGTH;
    const matchRate = options?.matchRate ?? 0.3;

    const intervalRef = useRef<number | null>(null);

    const canMatch = currentIndex >= n && isPlaying;

    // Advance through the sequence while playing
    useEffect(() => {
        if (!isPlaying) return;

        intervalRef.current = window.setInterval(() => {
            setCurrentIndex((prev) => {
                const lastIndex = sequence.length - 1;
                if (prev < lastIndex) return prev + 1;
                setIsPlaying(false);
                return prev;
            });
        }, speedMs) as unknown as number;

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPlaying, speedMs, sequence.length]);

    const startGame = () => {
        const seq = generateNBackSequence(n, length, mode, matchRate) as string[];
        setSequence(seq);
        setScore(0);
        setCurrentIndex(0);
        setIsPlaying(true);
    };

    const stopGame = () => {
        setIsPlaying(false);
    };

    const registerMatch = () => {
        if (!canMatch) return false;
        const matched = sequence[currentIndex] === sequence[currentIndex - n];
        if (matched) setScore((s) => s + 1);
        return matched;
    };

    const currentItem = useMemo(() => sequence[currentIndex] ?? '', [sequence, currentIndex]);

    return {
        sequence,
        currentIndex,
        currentItem,
        score,
        isPlaying,
        speedMs,
        setSpeedMs,
        canMatch,
        registerMatch,
        startGame,
        stopGame,
    };
};

export default useNBack;