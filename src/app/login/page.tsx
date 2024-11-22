'use client'

import Image from "next/image";
import LoginForm from "../components/login/LoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-toastify";

const Login = () => {
  const router = useRouter();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
          'http://localhost/api/login',
          { email, password },
          {withCredentials: true}
      );

      if (response.status === 200) {
        router.push('/dashboard');
        toast.success('Login efetuado com sucesso!');
      } else {
        toast.error('Erro na autenticação, tente novamente!');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  
  return (
    <div className="min-h-screen">
      <div className="container flex h-screen w-screen flex-col items-center justify-center m-auto">
        <a className="inline-flex items-center justify-center rounded-md 
          text-sm font-medium transition-colors focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:opacity-50 disabled:pointer-events-none ring-offset-background 
          hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 absolute 
          left-4 top-4 md:left-8 md:top-8" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left 
            mr-2 h-4 w-4">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
              Back
        </a>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border-2 rounded-md border-white shadow-2xl p-5">
          <div className="flex flex-col space-y-2 text-center">
            <Image 
              className="mx-auto dark:invert"  
              src="/logo.svg" 
              alt="" 
              width={64} 
              height={64}
            />
            <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground">Digite seu email e senha para entrar</p>
          </div>
          <div className="grid gap-6">
            <LoginForm onLoginAction={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;