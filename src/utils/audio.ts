// This file contains utility functions for handling audio playback in the n-back PWA application.

const audioFiles = {
    correct: new Audio('/sounds/correct.mp3'),
    incorrect: new Audio('/sounds/incorrect.mp3'),
    start: new Audio('/sounds/start.mp3'),
    end: new Audio('/sounds/end.mp3'),
};

export const playAudio = (type: 'correct' | 'incorrect' | 'start' | 'end') => {
    const audio = audioFiles[type];
    if (audio) {
        audio.currentTime = 0; // Reset audio to start
        audio.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
    }
};