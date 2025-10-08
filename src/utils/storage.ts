import { useEffect } from 'react';

const STORAGE_KEY = 'nBackGameData';

export const saveGameData = (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadGameData = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearGameData = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const useGameData = () => {
    useEffect(() => {
        const data = loadGameData();
        if (data) {
            // Handle loaded data (e.g., set state or update UI)
        }
    }, []);
};