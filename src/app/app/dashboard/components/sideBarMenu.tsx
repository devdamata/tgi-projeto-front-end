import { BarChart2, Layers, MessageSquare, Settings, Users, Layout, CheckSquare } from 'lucide-react';

// Componente SidebarLink separado com tipagem correta
interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  link: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, active = false, link }) => (
  <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg cursor-pointer
      ${active ? 'bg-blue-50 text-blue-500' : 'text-gray-600 hover:bg-gray-50'}`} >
      <a href={link} className="flex items-center space-x-2 w-full" >
          {icon}
          <span>{text}</span>
      </a>
  </div>
);

export default function SideBarMenu() {
  return(
    <>
      <nav>
          <SidebarLink icon={<Layout />} text="Dashboard" active  link="/app/dashboard"/>
          <SidebarLink icon={<CheckSquare />} text="Tarefas" link="/app/tasks" />
          <SidebarLink icon={<Layers />} text="Categorias" link="/app/category" />
          <SidebarLink icon={<Users />} text="Contacts" link="/app/dashboard" />
          <SidebarLink icon={<MessageSquare />} text="Chat" link="/app/dashboard" />
          <SidebarLink icon={<BarChart2 />} text="Deals" link="/app/dashboard" />
          <SidebarLink icon={<Settings />} text="Settings" link="/app/dashboard" />
      </nav>
    </>
  );
}