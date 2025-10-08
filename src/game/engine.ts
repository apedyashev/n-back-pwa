import { useState, useEffect } from 'react';
import { generateSequence } from './sequences';
import { NBackMode, Shape, Letter } from './types';

export class NBackGame {
    private sequence: (Letter | Shape)[];
    private currentIndex: number;
    private n: number;
    private mode: NBackMode;
    private userResponses: (Letter | Shape)[];
    private score: number;

    constructor(n: number = 2, mode: NBackMode = 'letter') {
        this.n = n;
        this.mode = mode;
        this.sequence = [];
        this.currentIndex = 0;
        this.userResponses = [];
        this.score = 0;
        this.generateNewSequence();
    }

    private generateNewSequence() {
        this.sequence = generateSequence(this.n, this.mode);
    }

    public getCurrentItem() {
        return this.sequence[this.currentIndex];
    }

    public checkResponse(userInput: Letter | Shape) {
        const correctItem = this.sequence[this.currentIndex - this.n];
        if (userInput === correctItem) {
            this.score++;
        }
        this.userResponses.push(userInput);
        this.currentIndex++;
        if (this.currentIndex >= this.sequence.length) {
            this.endGame();
        }
    }

    public endGame() {
        // Logic to handle end of game, e.g., reset or show results
        console.log('Game Over! Your score:', this.score);
    }

    public resetGame() {
        this.currentIndex = 0;
        this.userResponses = [];
        this.score = 0;
        this.generateNewSequence();
    }

    public setN(n: number) {
        this.n = n;
        this.resetGame();
    }

    public setMode(mode: NBackMode) {
        this.mode = mode;
        this.resetGame();
    }
}

export const useNBack = (initialN: number = 2, initialMode: NBackMode = 'letter') => {
    const [game, setGame] = useState(new NBackGame(initialN, initialMode));

    useEffect(() => {
        setGame(new NBackGame(initialN, initialMode));
    }, [initialN, initialMode]);

    return {
        currentItem: game.getCurrentItem(),
        checkResponse: (input: Letter | Shape) => game.checkResponse(input),
        resetGame: () => game.resetGame(),
        setN: (n: number) => game.setN(n),
        setMode: (mode: NBackMode) => game.setMode(mode),
        score: game.score,
    };
};