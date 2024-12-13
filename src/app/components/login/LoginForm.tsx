'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onLoginAction: (credentials: { email: string; password: string }) => void;
}

export default function LoginForm({ onLoginAction }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Adicione este useEffect para capturar o preenchimento automático
  useEffect(() => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const handleAutoFill = () => {
      if (emailInput) {
        setEmail(emailInput.value);
      }
      if (passwordInput) {
        setPassword(passwordInput.value);
      }
    };

    // Adiciona os event listeners
    emailInput?.addEventListener('input', handleAutoFill);
    passwordInput?.addEventListener('input', handleAutoFill);

    // Verifica valores iniciais após um pequeno delay
    setTimeout(handleAutoFill, 100);

    // Cleanup
    return () => {
      emailInput?.removeEventListener('input', handleAutoFill);
      passwordInput?.removeEventListener('input', handleAutoFill);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginAction({ email, password });
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do botão submit
    router.push('/register');
  };

  return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <input
                type="email"
                id="email"
                name="email" // Adicione o atributo name
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                autoComplete="username" // Adicione o autoComplete correto
                className="flex h-10 w-full rounded-md border border-input
            bg-transparent px-3 py-2 text-sm ring-offset-background
            file:border-0 file:bg-transparent file:text-sm file:font-medium
            placeholder:text-muted-foreground focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50 mt-5 text-black"
            />
          </div>
          <div>
            <input
                type="password"
                id="password"
                name="password" // Adicione o atributo name
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                autoComplete="current-password" // Adicione o autoComplete correto
                className="flex h-10 w-full rounded-md border border-input
            bg-transparent px-3 py-2 text-sm ring-offset-background
            file:border-0 file:bg-transparent file:text-sm file:font-medium
            placeholder:text-muted-foreground focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50 mt-5 text-black"
            />
          </div>
          <button type="submit"
                  className="w-full mt-5 text-white font-semibold text-base inline-flex
          items-center justify-center rounded-md transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none ring-offset-background
          bg-sky-400 text-primary-foreground hover:bg-white/90 hover:text-black/90
          hover:border shadow-2xl h-10 py-2 px-4">
            Entrar
          </button>
          <div className="relative mt-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground">Ou</span>
            </div>
          </div>
          <button
              type="button" // Mudei para type="button" para não submeter o form
              onClick={handleRegisterClick}
              className="w-full mt-5 text-white font-semibold text-base inline-flex
          items-center justify-center rounded-md transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none ring-offset-background
          bg-sky-400 text-primary-foreground hover:bg-white/90 hover:text-black/90
          hover:border shadow-2xl h-10 py-2 px-4"
          >
            Criar conta
          </button>
          <div className="w-full flex justify-center items-center mt-10">
            <a href="#" className="text-sm font-thin text-accent text-sky-400">
              Esqueceu a senha
            </a>
          </div>
        </form>
      </>
  );
}