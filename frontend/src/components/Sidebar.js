import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HomeIcon, SearchIcon, LibraryIcon } from './Icons';
import logo from '../logo.svg';

const SidebarContainer = styled.div`
  width: 280px;
  background: linear-gradient(180deg, #1a1a2e 0%, #2a2a3c 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 24px;
  border-right: 1px solid rgba(138, 77, 255, 0.1);
  position: fixed;
  left: 0;
  top: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 0 16px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

const AppName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  background: linear-gradient(45deg, #8a4dff, #ff4081);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavMenu = styled.ul`
  margin: 0;
  padding: 0 16px;
  list-style: none;
`;

const NavItem = styled.li`
  margin: 8px 0;
  
  a {
    color: #b3b3b3;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
    
    &:hover {
      color: #ffffff;
      background: rgba(138, 77, 255, 0.1);
      
      svg {
        fill: #8a4dff;
      }
    }
    
    &.active {
      color: #ffffff;
      background: rgba(138, 77, 255, 0.2);
      
      svg {
        fill: #ff4081;
      }
    }
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(138, 77, 255, 0.2);
  margin: 24px 0;
`;

const Playlists = styled.div`
  padding: 0 16px;
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(138, 77, 255, 0.5);
    border-radius: 4px;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
    color: #8a4dff;
    margin: 0 0 16px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 12px 20px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.95rem;
      color: #b3b3b3;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
      
      &:hover {
        color: #ffffff;
        background: rgba(138, 77, 255, 0.1);
      }
    }
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={logo} alt="Music Connect Logo" />
        <AppName>Music Connect</AppName>
      </LogoContainer>
      
      <NavMenu>
        <NavItem>
          <Link to="/" className="active">
            <HomeIcon />
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/search">
            <SearchIcon />
            Search
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/library">
            <LibraryIcon />
            Your Library
          </Link>
        </NavItem>
      </NavMenu>
      
      <Divider />
      
      <Playlists>
        <h2>Your Playlists</h2>
        <ul>
          <li>Liked Songs</li>
          <li>Discover Weekly</li>
          <li>Daily Mix 1</li>
          <li>Chill Vibes</li>
          <li>Top Hits 2023</li>
          <li>Workout Mix</li>
          <li>Late Night Jazz</li>
          <li>Focus Flow</li>
          <li>Mood Booster</li>
          <li>Throwback Jams</li>
        </ul>
      </Playlists>
    </SidebarContainer>
  );
}

export default Sidebar;