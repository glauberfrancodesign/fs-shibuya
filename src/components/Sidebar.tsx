import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PalmtreeIcon, Search, Home, Grid, Layout,
  HelpCircle, Sun, ChevronLeft, ChevronRight,
  Trello 
} from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';
import { useAuthStore } from '../store/authStore';
import ProfileDropdown from './ProfileDropdown';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();
  const { isCollapsed, setCollapsed } = useSidebarStore();
  const { user } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigation: NavItem[] = [
    { 
      label: 'Home', 
      icon: <Home className="w-4 h-4" />, 
      path: '/' 
    },
    { 
      label: 'Projects', 
      icon: <Grid className="w-4 h-4" />, 
      path: '/projects' 
    },
    {
      label: 'Boards',
      icon: <Layout className="w-4 h-4" />,
      path: '/boards'
    },
    {
      label: 'Kanban',
      icon: <Trello className="w-4 h-4" />,
      path: '/kanban'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getLastName = (name: string = '') => {
    const nameParts = name.split(' ');
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : name;
  };

  const getSubscriptionBadge = () => {
    if (user?.subscription_tier === 'pro') {
      return <span className="text-xs font-medium px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full">PRO</span>;
    }
    return <span className="text-xs font-medium px-2 py-0.5 bg-dark-700 text-dark-400 rounded-full">FREE</span>;
  };

  return (
    <div 
      className={`${
        isCollapsed ? 'w-[72px]' : 'w-64'
      } bg-dark-900 min-h-screen border-r border-dark-800 flex flex-col transition-all duration-300 relative`}
    >
      <div className="flex flex-col flex-1">
        {/* Logo Section */}
        <div className="h-[72px] p-4 flex items-center justify-center">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <PalmtreeIcon className="w-8 h-8 text-white transition-transform duration-300 hover:scale-110 shrink-0" />
            {!isCollapsed && (
              <span className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden transition-all duration-300">
                Franco Labs
              </span>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`nav-link h-10 flex items-center ${isActive(item.path) ? 'active' : ''} ${
                  isCollapsed ? 'justify-center px-2' : 'px-3'
                } transition-all duration-200 hover:translate-x-1`}
              >
                <span className="shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span className="text-sm truncate transition-all duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Search - Only show when expanded */}
          {!isCollapsed && (
            <div className="relative mt-6 transition-all duration-300">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 bg-dark-800 text-white pl-10 pr-4 rounded-md text-sm placeholder-dark-400 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-all duration-200 hover:bg-dark-700"
              />
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-auto p-4 space-y-1">
          <Link 
            to="/help" 
            className={`nav-link h-10 flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} transition-all duration-200 hover:translate-x-1`}
          >
            <span className="shrink-0"><HelpCircle className="w-4 h-4" /></span>
            {!isCollapsed && (
              <span className="text-sm truncate transition-all duration-300">
                Help & Support
              </span>
            )}
          </Link>
          <button 
            className={`nav-link h-10 w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} transition-all duration-200 hover:translate-x-1`}
          >
            <span className="shrink-0"><Sun className="w-4 h-4" /></span>
            {!isCollapsed && (
              <span className="text-sm truncate transition-all duration-300">
                Light Mode
              </span>
            )}
          </button>

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-full nav-link h-12 flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} transition-all duration-200 hover:translate-x-1`}
            >
              <div className="avatar">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="avatar-text">
                    {getInitials(user?.full_name || 'Anonymous User')}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1 ml-3">
                  <span className="text-sm font-medium truncate">
                    {getLastName(user?.full_name) || 'Anonymous'}
                  </span>
                  {getSubscriptionBadge()}
                </div>
              )}
            </button>

            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!isCollapsed)}
        className="absolute -right-3 bottom-10 w-6 h-6 bg-dark-800 border border-dark-700 rounded-full flex items-center justify-center text-dark-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-accent-500 group"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        ) : (
          <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
