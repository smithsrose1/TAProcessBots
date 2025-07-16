// src/components/ui/Layout.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Bell,
  User,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
 
const navigationItems = [
  { name: 'Dashboard',    href: '/',               icon: LayoutDashboard },
  { name: 'Requisitions', href: '/requisitions',   icon: FileText },
  { name: 'Candidates',   href: '/candidates',     icon: Users },
  { name: 'Interviews',   href: '/interviews',     icon: Calendar },
  { name: 'Reports',      href: '/reports',        icon: BarChart3 },
  { name: 'Settings',     href: '/settings',       icon: Settings },
];
 
interface LayoutProps {
  children: React.ReactNode;
}
 
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: 'New candidate applied' },
    { id: 2, text: 'Interview scheduled' },
    { id: 3, text: 'JD clarity alert' },
  ];
 
  return (
<div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">RT TA Bots</h1>
          </div>

          {/* User Role Panel */}
          <div className="mt-8 px-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">John Smith</p>
                  <p className="text-xs text-gray-500">Hiring Manager</p>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      isActive
                        ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-5 w-5'
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
<div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Page Title */}
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                Real-Time TA Process Bots
              </h2>

              {/* Right-side Controls */}
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
<div className="relative">
<button
                    onClick={() => {
                      setNotifOpen(o => !o);
                      if (hasUnread) setHasUnread(false);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                    aria-expanded={notifOpen}
                    aria-label="Notifications"
>
<Bell className="h-6 w-6" />
                    {hasUnread && (
<span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                    )}
</button>
 
                  {notifOpen && (
<div
                      className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50"
                      role="menu"
                      aria-label="Notification list"
>
<ul className="divide-y divide-gray-100">
                        {notifications.map(n => (
                          <li key={n.id} className="px-4 py-2 hover:bg-gray-50" role="menuitem">
                            {n.text}
</li>
                        ))}
</ul>
</div>
                  )}
</div>
 
                {/* User Avatar */}
<div className="flex items-center space-x-2">
<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
<span className="text-white text-sm font-medium">JS</span>
</div>
</div>
</div>
</div>
</div>
</header>
 
        {/* Page Content */}
<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
</div>
</main>
</div>
</div>
  );
};
 
export default Layout;