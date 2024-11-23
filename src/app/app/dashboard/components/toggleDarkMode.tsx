'use client';

import React, { useEffect, useState } from 'react';

interface ITheme {
    savedTheme: 'light' | 'dark';
}

export default function DarkModeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme: ITheme['savedTheme'] = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg"
        >
            {theme === 'dark' ? (
                <span className="text-gray-800 dark:text-gray-200">🌙 Dark Mode</span>
            ) : (
                <span className="text-gray-800 dark:text-gray-200">☀️ Light Mode</span>
            )}
        </button>
    );
}
