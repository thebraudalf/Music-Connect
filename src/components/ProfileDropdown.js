import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ProfileIcon, SettingsIcon, LogoutIcon } from './Icons';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b3b3b3;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    
    svg {
      fill: #8a4dff;
    }
  }
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #8a4dff;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  background: #2a2a3c;
  border-radius: 8px;
  padding: 8px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 77, 255, 0.2);
  z-index: 1000;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #b3b3b3;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(138, 77, 255, 0.1);
    color: white;
    
    svg {
      fill: #8a4dff;
    }
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  color: #b3b3b3;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: rgba(255, 68, 68, 0.1);
    color: #ff4444;
    
    svg {
      fill: #ff4444;
    }
  }
`;

const ProfileDropdown = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <DropdownContainer>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>
        {user.profilePic ? (
          <img src={user.profilePic} alt={user.name} />
        ) : (
          <ProfileIcon />
        )}
      </ProfileButton>
      
      {isOpen && (
        <DropdownMenu>
          <MenuItem to="/profile" onClick={() => setIsOpen(false)}>
            <ProfileIcon />
            View Profile
          </MenuItem>
          <MenuItem to="/account" onClick={() => setIsOpen(false)}>
            <SettingsIcon />
            Account Settings
          </MenuItem>
          <LogoutButton onClick={handleLogout}>
            <LogoutIcon />
            Log Out
          </LogoutButton>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default ProfileDropdown;