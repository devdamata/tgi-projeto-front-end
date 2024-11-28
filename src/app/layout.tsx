import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { cookies } from 'next/headers';
import { UserProvider } from './UserContext';

export const metadata: Metadata = {
  title: 'Gerenciador de Tarefas com Organização por Categorias e Prioridades',
  description: '',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Acessando os cookies no lado do servidor
  const cookie = cookies();
  const userInfo = cookie.get('userInfo');

  let user = null;
  if (userInfo) {
    try {
      user = JSON.parse(decodeURIComponent(userInfo.value)); // Convertendo o cookie para objeto
    } catch (error) {
      console.error('Erro ao analisar o cookie:', error);
    }
  }

  return (
    <UserProvider initialUser={user}>
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </UserProvider>
  );
}

// app/layout.tsx ou pages/_app.tsx



