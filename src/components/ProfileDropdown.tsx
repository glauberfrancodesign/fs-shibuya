import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, Crown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSidebarStore } from '../store/sidebarStore';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuthStore();
  const { isCollapsed } = useSidebarStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const dropdownStyle = {
    position: 'fixed' as const,
    left: isCollapsed ? '72px' : '264px',
    bottom: '88px',
    zIndex: 50,
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div 
        ref={dropdownRef}
        className="w-64 bg-dark-900 rounded-xl border border-dark-800 shadow-lg z-50"
        style={dropdownStyle}
      >
        <div className="p-4 border-b border-dark-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="avatar">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name || user.email}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="avatar-text">
                  {getInitials(user?.full_name)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.full_name || 'Anonymous User'}
              </p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
          </div>

          {user?.subscription_tier === 'pro' ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-lg">
              <Crown className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-green-500">Pro Account</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-dark-800 rounded-lg">
              <Crown className="w-4 h-4 text-dark-400" />
              <span className="text-xs font-medium text-dark-400">Free Account</span>
            </div>
          )}
        </div>

        <div className="p-1">
          <Link
            to="/settings/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-dark-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
            onClick={onClose}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-400 rounded-lg hover:bg-dark-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;