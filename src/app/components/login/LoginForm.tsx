'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onLoginAction: (credentials: { email: string; password: string }) => void;
}

export default function LoginForm({ onLoginAction }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginAction({ email, password });
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@example.com"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
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
          hover:border shadow-2xl h-10 py-2 px-4">Entrar
        </button>
        <div className="relative mt-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground">Ou</span>
          </div>
        </div>
        <button type="submit" 
          className="w-full mt-5 text-white font-semibold text-base inline-flex 
          items-center justify-center rounded-md transition-colors focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:opacity-50 disabled:pointer-events-none ring-offset-background 
          bg-sky-400 text-primary-foreground hover:bg-white/90 hover:text-black/90
          hover:border shadow-2xl h-10 py-2 px-4"
                onClick={handleRegisterClick}
        >
          Criar conta
        </button>
        <div className="w-full flex justify-center items-center mt-10">
          <a href="#" className="text-sm font-thin text-accent text-sky-400">Esqueceu a senha</a>
        </div>
      </form>
      
    </>
  );
}

