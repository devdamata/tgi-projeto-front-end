import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ThemeProvider from './ThemeProvider';

export const metadata: Metadata = {
  title: 'Gerenciador de Tarefas com Organização por Categorias e Prioridades',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-roboto bg-gray-100 dark:bg-gray-900">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
