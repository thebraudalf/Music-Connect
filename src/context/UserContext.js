import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '123',
    name: 'John Doe',
    email: 'john@musicconnect.com',
    profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
    followers: 2450,
    following: 150,
    playlists: 45,
    topArtists: ['The Weeknd', 'Drake', 'Taylor Swift'],
    topTracks: ['Blinding Lights', 'Save Your Tears', 'Starboy']
  });

  const logout = () => {
    setUser(null);
    // Add actual logout logic here
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);