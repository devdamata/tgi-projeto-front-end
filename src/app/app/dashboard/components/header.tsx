'use client';
import Image from "next/image";
import { useUser } from "@/app/UserContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end">
          <div className="w-full max-w-lg">
            <div className="flex items-center space-x-4">
              <Image 
                src="/avatar/avatar.png" 
                alt="Profile" 
                width={40} 
                height={40} 
                className="rounded-full border-2 border-gray-300 dark:border-gray-700" 
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {user?.name || "Nome do Usuário"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email || "Email do Usuário"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
