'use client';

import { BarChart2, Layers, MessageSquare, Settings, Users, Layout, CheckSquare } from 'lucide-react';
import DarkModeToggle from './toggleDarkMode';
import { useTheme } from '@/app/hooks/useTheme';

// Componente SidebarLink separado com tipagem correta
interface SidebarLinkProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    link: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, active = false, link }) => {
    const { theme } = useTheme(); // Obtém o tema atual do hook
    console.log(theme);
    return (
        <div
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg cursor-pointer transition-colors
                ${
                    active
                        ? theme === 'dark'
                            ? 'bg-blue-900 text-blue-300'
                            : 'bg-blue-50 text-blue-500'
                        : theme === 'dark'
                            ? 'text-gray-400 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <a href={link} className="flex items-center space-x-2 w-full">
                {icon}
                <span>{text}</span>
            </a>
        </div>
    );
};

export default function SideBarMenu() {
    return (
        <nav
            className="h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col justify-between"
        >
            <div>
                <SidebarLink icon={<Layout />} text="Dashboard" active link="/app/dashboard" />
                <SidebarLink icon={<CheckSquare />} text="Tarefas" link="/app/tasks" />
                <SidebarLink icon={<Layers />} text="Categorias" link="/app/category" />
                {/* <SidebarLink icon={<Users />} text="Contacts" link="/app/dashboard" />
                <SidebarLink icon={<MessageSquare />} text="Chat" link="/app/dashboard" />
                <SidebarLink icon={<BarChart2 />} text="Deals" link="/app/dashboard" /> */}
                <SidebarLink icon={<Settings />} text="Configurações" link="/app/dashboard" />
            </div>
            <div className="p-4">
                <DarkModeToggle />
            </div>
        </nav>
    );
}
