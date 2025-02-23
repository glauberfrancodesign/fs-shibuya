import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { Button } from './ui';

const ProfileDropdown = () => {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        onClick={() => navigate('/settings/profile')}
      >
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </Button>

      <Button
        variant="danger"
        size="sm"
        className="w-full justify-start"
        onClick={() => {
          signOut();
          onClose();
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </Button>
    </>
  );
};

export default ProfileDropdown;
