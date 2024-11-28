'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import GraphicPie from "@/app/components/dashboard/GraphicPie";
import SideBar from './components/sideBar';
import Header from './components/header';
import { useTheme } from '@/app/hooks/useTheme';
import Calendar from './components/calendar';

// Importação dinâmica do Recharts
const LineChart = dynamic(
    () => import('recharts').then((mod) => mod.LineChart), 
    { ssr: false }
);
const Line = dynamic(
    //@ts-ignore
    () => import('recharts').then((mod) => mod.Line), 
    { ssr: false }
);
const XAxis = dynamic(
    //@ts-ignore
    () => import('recharts').then((mod) => mod.XAxis), 
    { ssr: false }
);
const YAxis = dynamic(
    //@ts-ignore
    () => import('recharts').then((mod) => mod.YAxis), 
    { ssr: false }
);
const CartesianGrid = dynamic(
    //@ts-ignore
    () => import('recharts').then((mod) => mod.CartesianGrid), 
    { ssr: false }
);
const Tooltip = dynamic(
    //@ts-ignore
    () => import('recharts').then((mod) => mod.Tooltip), 
    { ssr: false }
);

const mockData = [
    { name: '1 Dec', value: 50 },
    { name: '8 Dec', value: 90 },
    { name: '16 Dec', value: 170 },
    { name: '24 Dec', value: 60 },
    { name: '31 Dec', value: 146 }
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const tasks = [
    { title: 'Send benefit review by Sunday', dueDate: 'December 23, 2018', type: 'Reminder', status: 'completed', assignee: 'George Fields' },
    { title: 'Invite to office meet-up', dueDate: 'December 23, 2018', type: 'Call', status: 'ended', assignee: 'Rebecca Moore' },
    { title: 'Office meet-up', dueDate: 'December 23, 2018', type: 'Event', status: 'completed', assignee: 'Lindsey Stroud' }
];

export default function Dashboard() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
            <SideBar />
            <div className="flex-1 overflow-auto">
                <Header />
                {/* Content */}
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Deals Graph */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categorias</h2>
                                <select className="border rounded px-2 py-1  text-gray-900 dark:bg-gray-700 dark:text-white">
                                    <option>Mensal</option>
                                </select>
                            </div>
                            <GraphicPie />
                        </div>
                        {/* Progress Bar */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4 text-gray-900 dark:text-gray-300">
                                <span>8 Tarefas completadas de 20</span>
                                <div className="flex items-center">
                                    <span className="mr-2">Filtro:</span>
                                    <select className="border rounded px-2 py-1 text-gray-900 dark:bg-gray-700 dark:text-white">
                                        <option>Mensal</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Calendar */}
                            {/* <Calendar /> */}
                            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                                <Calendar />

                                {/* Tasks List */}
                                <div className="mt-8">
                                    {tasks.map((task, i) => (
                                        <div key={i} className="border-t border-gray-300 dark:border-gray-600 py-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">Estudo da Língua Inglesa</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Data: 27 de Novembro de 2024</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm
                                                        ${task.status === 'completed' ? 'bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100' : 'bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-100'}`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center">
                                                <Image
                                                    src="https://via.assets.so/game.png?id=1&q=24&w=24&h=24&fit=fill"
                                                    alt={task.assignee}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full mr-2"
                                                />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{task.assignee}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Deals Graph */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    {/* <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Deals</h2>
                                    <select className="border rounded px-2 py-1 text-gray-900 dark:bg-gray-700 dark:text-white">
                                        <option>Monthly</option>
                                    </select> */}
                                </div>
                                <div style={{ width: '100%', height: '250px' }}>
                                    <LineChart width={300} height={200} data={mockData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
