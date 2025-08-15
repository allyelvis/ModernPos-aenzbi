import React, { useEffect, useMemo } from 'react';
import { NAV_ITEMS } from '../constants';
import type { Page, User } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  activeUser: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, activeUser, onLogout }) => {

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  });
  
  const accessibleNavItems = useMemo(() => {
    return NAV_ITEMS.filter(item => item.roles.includes(activeUser.role));
  }, [activeUser.role]);

  return (
    <aside className="w-20 lg:w-64 bg-dark-800 p-2 lg:p-4 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-center justify-center lg:justify-start mb-10 p-2">
           <i data-lucide="gem" className="text-brand-primary h-8 w-8 lg:h-10 lg:w-10"></i>
           <h1 className="hidden lg:block text-2xl font-bold ml-3 text-white">Nexus POS</h1>
        </div>
        <nav>
          <ul>
            {accessibleNavItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center w-full text-left p-3 my-2 rounded-lg transition-colors duration-200 ${
                    activePage === item.id
                      ? 'bg-brand-primary text-white'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <span className="w-6 h-6">{item.icon}</span>
                  <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
       <div className="p-3 rounded-lg bg-dark-900">
        <div className="flex items-center">
            <img src={`https://i.pravatar.cc/150?u=${activeUser.email}`} alt="Admin" className="w-10 h-10 rounded-full" />
            <div className="hidden lg:block ml-4 flex-1">
                <p className="font-semibold text-white truncate">{activeUser.name}</p>
                <p className="text-xs text-gray-400">{activeUser.role}</p>
            </div>
            <button onClick={onLogout} className="hidden lg:block ml-2 text-gray-400 hover:text-white" title="Logout">
                <i data-lucide="log-out" className="w-5 h-5"></i>
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
