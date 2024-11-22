import Image from "next/image";
import SideBarMenu from './sideBarMenu';

export default function SideBar() {
  return (
    <>
      <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
              <div className="flex items-center space-x-4 mb-8">
                  <Image src="/avatar/avatar.png" alt="Profile" width={40} height={40} className="rounded-full" />
                  <div>
                      <h3 className="font-medium">Sierra Ferguson</h3>
                      <p className="text-sm text-gray-500">s.ferguson@gmail.com</p>
                  </div>
              </div>
              <SideBarMenu />
          </div>
      </div>
    </>
  );
}