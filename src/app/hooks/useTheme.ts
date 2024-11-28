import { useState, useEffect } from 'react';

interface ITheme {
    savedTheme: '' | 'dark';
}

export function useTheme() {
    const [theme, setTheme] = useState<'' | 'dark' | null>(null);

    useEffect(() => {
        const savedTheme: ITheme['savedTheme'] = (localStorage.getItem('theme') as '' | 'dark') || '';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === '' ? 'dark' : '';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return { theme, toggleTheme };
}
