'use client';

import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProvider } from './UserContext';
import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions/check-is-public-route';
import PrivateRoute from '@/components/PrivateRoute';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Acessando os cookies no lado do servidor
  // const cookie = cookies();
  // const userInfo = cookie.get('userInfo');

  const user = {id: 1, name: 'Anderson TESTE12310', email: 'teste@teste.com'}
    

  //verificação se o usuário está logado.

  const pathName = usePathname();

  const isPublicPage = checkIsPublicRoute(pathName)

  return (
    <UserProvider initialUser={user}>
      <html lang="pt-BR">
        <body>
          {isPublicPage && children}
          {!isPublicPage && (
            <PrivateRoute>{children}</PrivateRoute>
          )}          
        </body>
      </html>
    </UserProvider>
  );
}

// app/layout.tsx ou pages/_app.tsx



