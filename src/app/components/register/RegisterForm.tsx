'use client'

import React, { useState } from "react";

interface RegisterFormProps {
    onRegisterAction: (
        credentials: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => Promise<void>;
}

export default function RegisterForm({ onRegisterAction }: RegisterFormProps) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmed] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onRegisterAction({ name, email, password, password_confirmation });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="name"
                        id="name"
                        name={name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Nome completo"
                        className="flex h-10 w-full rounded-md border border-input
                                    bg-transparent px-3 py-2 text-sm ring-offset-background
                                    file:border-0 file:bg-transparent file:text-sm file:font-medium
                                    placeholder:text-muted-foreground focus-visible:outline-none
                                    focus-visible:ring-2 focus-visible:ring-ring
                                    focus-visible:ring-offset-2
                                    disabled:cursor-not-allowed disabled:opacity-50 mt-5"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name={email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="E-mail"
                        className="flex h-10 w-full rounded-md border border-input
                                    bg-transparent px-3 py-2 text-sm ring-offset-background
                                    file:border-0 file:bg-transparent file:text-sm file:font-medium
                                    placeholder:text-muted-foreground focus-visible:outline-none
                                    focus-visible:ring-2 focus-visible:ring-ring
                                    focus-visible:ring-offset-2
                                    disabled:cursor-not-allowed disabled:opacity-50 mt-5"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name={password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Senha"
                        className="flex h-10 w-full rounded-md border border-input
                                    bg-transparent px-3 py-2 text-sm ring-offset-background
                                    file:border-0 file:bg-transparent file:text-sm file:font-medium
                                    placeholder:text-muted-foreground focus-visible:outline-none
                                    focus-visible:ring-2 focus-visible:ring-ring
                                    focus-visible:ring-offset-2
                                    disabled:cursor-not-allowed disabled:opacity-50 mt-5"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password_confirmed"
                        name={password_confirmation}
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmed(e.target.value)}
                        required
                        placeholder="Confirmar senha"
                        className="flex h-10 w-full rounded-md border border-input
                                    bg-transparent px-3 py-2 text-sm ring-offset-background
                                    file:border-0 file:bg-transparent file:text-sm file:font-medium
                                    placeholder:text-muted-foreground focus-visible:outline-none
                                    focus-visible:ring-2 focus-visible:ring-ring
                                    focus-visible:ring-offset-2
                                    disabled:cursor-not-allowed disabled:opacity-50 mt-5"
                    />
                </div>
                <button type="submit"
                        className="w-full mt-5 text-white font-semibold text-base inline-flex
                          items-center justify-center rounded-md transition-colors focus-visible:outline-none
                          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                          disabled:opacity-50 disabled:pointer-events-none ring-offset-background
                          bg-sky-400 text-primary-foreground hover:bg-white/90 hover:text-black/90
                          hover:border shadow-2xl h-10 py-2 px-4">Registrar-se
                </button>

                <div className="w-full flex justify-center items-center mt-5">
                    <a href="/login" className="text-sm font-thin text-accent text-sky-400">Já possui uma conta?</a>
                </div>
            </form>

        </>
    );
}

