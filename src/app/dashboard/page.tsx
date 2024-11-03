'use client';

import React from 'react';
import { BarChart2, Mail, MessageSquare, Settings, Users, Layout, CheckSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from "next/image";

// Importação dinâmica do Recharts
const LineChart = dynamic(
    () => import('recharts').then((mod) => mod.LineChart),
    { ssr: false }
);

const Line = dynamic(
    () => import('recharts').then((mod) => mod.Line),
    { ssr: false }
);

const XAxis = dynamic(
    () => import('recharts').then((mod) => mod.XAxis),
    { ssr: false }
);

const YAxis = dynamic(
    () => import('recharts').then((mod) => mod.YAxis),
    { ssr: false }
);

const CartesianGrid = dynamic(
    () => import('recharts').then((mod) => mod.CartesianGrid),
    { ssr: false }
);

const Tooltip = dynamic(
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

// Componente SidebarLink separado com tipagem correta
interface SidebarLinkProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, active = false }) => (
    <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg cursor-pointer
    ${active ? 'bg-blue-50 text-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}>
        {icon}
        <span>{text}</span>
    </div>
);

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4">
                    <div className="flex items-center space-x-4 mb-8">
                        <Image src="/avatar/avatar.png" alt="Profile" width={40} height={40} className="rounded-full" />
                        <div>
                            <h3 className="font-medium">Sierra Ferguson</h3>
                            <p className="text-sm text-gray-500">s.ferguson@gmail.com</p>
                        </div>
                    </div>
                    <nav>
                        <SidebarLink icon={<Layout />} text="Dashboard" active />
                        <SidebarLink icon={<CheckSquare />} text="Tasks" />
                        <SidebarLink icon={<Mail />} text="Email" />
                        <SidebarLink icon={<Users />} text="Contacts" />
                        <SidebarLink icon={<MessageSquare />} text="Chat" />
                        <SidebarLink icon={<BarChart2 />} text="Deals" />
                        <SidebarLink icon={<Settings />} text="Settings" />
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <div className="bg-white p-4 shadow-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center">
                            <div className="w-full max-w-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></div>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Global search"*/}
                            {/*    className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Progress Bar */}
                        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <span>8 task completed out of 10</span>
                                <div className="flex items-center">
                                    <span className="mr-2">Show:</span>
                                    <select className="border rounded px-2 py-1">
                                        <option>This week</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Calendar */}
                            <div className="col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">23 December, Sunday</h2>
                                <div className="grid grid-cols-7 gap-4">
                                    {weekDays.map((day, i) => (
                                        <div key={day} className="text-center">
                                            <div className="text-gray-500 mb-2">{day}</div>
                                            <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center
                                                ${i === 0 ? 'bg-blue-500 text-white' : ''}`}>
                                                {23 + i}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tasks List */}
                                <div className="mt-8">
                                    {tasks.map((task, i) => (
                                        <div key={i} className="border-t py-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium">{task.title}</h3>
                                                    <p className="text-sm text-gray-500">Due date: {task.dueDate}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm
                                                        ${task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center">
                                                <Image
                                                    src="/api/placeholder/24/24"
                                                    alt={task.assignee}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full mr-2"
                                                />
                                                <span className="text-sm text-gray-600">{task.assignee}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Deals Graph */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">Deals</h2>
                                    <select className="border rounded px-2 py-1">
                                        <option>Monthly</option>
                                    </select>
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