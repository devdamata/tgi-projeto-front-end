import Image from "next/image";
import SideBarMenu from './sideBarMenu';
import { useEffect } from "react";

export default function SideBar() {


  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-8 mt-8">
          {/* <Image 
            src="/avatar/avatar.png" 
            alt="Profile" 
            width={40} 
            height={40} 
            className="rounded-full border-2 border-gray-300 dark:border-gray-700" 
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Anderson da Mata Pereira</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">anderson.pereira93@cs.cruzeirodosul.edu.br</p>
          </div> */}
        </div>
        <SideBarMenu />
      </div>
    </aside>
  );
}
