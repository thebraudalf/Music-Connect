import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusIcon } from '../components/Icons';

const LibraryContainer = styled.div`
 color: white;
  padding: 32px 48px 100px;
  flex: 1;
  overflow-y: auto;
  margin-left: 280px; // Match sidebar width
  height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 32px 24px;
  }
`;

const LibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #8a4dff, #ff4081);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

const FilterButton = styled.button`
  background: ${props => props.active 
    ? 'linear-gradient(45deg, #8a4dff, #ff4081)' 
    : 'rgba(64, 64, 64, 0.8)'};
  color: ${props => props.active ? 'white' : '#b3b3b3'};
  border: none;
  border-radius: 24px;
  padding: 10px 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid ${props => props.active ? '#8a4dff' : 'rgba(138, 77, 255, 0.1)'};
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(45deg, #6e3dcc, #cc3370)'
      : 'rgba(138, 77, 255, 0.1)'};
  }
`;

const CreatePlaylistButton = styled.button`
  background: rgba(138, 77, 255, 0.1);
  border: 1px solid rgba(138, 77, 255, 0.3);
  color: #8a4dff;
  border-radius: 24px;
  padding: 10px 24px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(138, 77, 255, 0.2);
    border-color: #8a4dff;
    transform: translateY(-2px);
  }
  
  svg {
    fill: #8a4dff;
    width: 20px;
    height: 20px;
  }
`;

const LibraryContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
  position: relative;
  z-index: 1;
`;

const CollectionCard = styled.div`
  background: rgba(42, 42, 60, 0.9);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 77, 255, 0.1);
  min-height: 260px;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(138, 77, 255, 0.1);
    box-shadow: 0 8px 32px rgba(138, 77, 255, 0.2);
    
    img {
      transform: scale(1.05);
    }
  }
  
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: ${props => props.isPlaylist ? '8px' : '50%'};
    margin-bottom: 16px;
    transition: transform 0.3s ease;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  
  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem;
    color: #b3b3b3;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const EmptyLibrary = styled.div`
  background: rgba(42, 42, 60, 0.9);
  border-radius: 16px;
  padding: 48px 24px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 77, 255, 0.1);
  position: relative;
  z-index: 1;
  
  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: #8a4dff;
  }
  
  p {
    color: #b3b3b3;
    margin-bottom: 32px;
    font-family: 'Poppins', sans-serif;
  }
  
  button {
    background: linear-gradient(45deg, #8a4dff, #ff4081);
    color: white;
    border: none;
    border-radius: 24px;
    padding: 12px 40px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

// Keep mock library data the same...
const libraryItems = [
  {
    id: 1,
    name: 'Liked Songs',
    type: 'playlist',
    owner: 'You',
    tracks: 124,
    image: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    isPlaylist: true
  },
  {
    id: 2,
    name: 'Discover Weekly',
    type: 'playlist',
    owner: 'Spotify',
    tracks: 30,
    image: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebcdce7620dc940db079bf4952/1/en/default',
    isPlaylist: true
  },
  {
    id: 3,
    name: 'The Weeknd',
    type: 'artist',
    followers: '108.5M',
    image: 'https://i.scdn.co/image/ab6761610000e5eb87bca6999d7fbdce934f5736',
    isPlaylist: false
  },
  {
    id: 4,
    name: 'Chill Vibes',
    type: 'playlist',
    owner: 'You',
    tracks: 45,
    image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517656cae7c12ce7578',
    isPlaylist: true
  },
  {
    id: 5,
    name: 'Taylor Swift',
    type: 'artist',
    followers: '82.7M',
    image: 'https://i.scdn.co/image/ab6761610000e5eb6a224073987b930f99adc8bc',
    isPlaylist: false
  },
  {
    id: 6,
    name: 'Workout Mix',
    type: 'playlist',
    owner: 'You',
    tracks: 32,
    image: 'https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32d877a9',
    isPlaylist: true
  },
  {
    id: 7,
    name: 'Drake',
    type: 'artist',
    followers: '73.2M',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
    isPlaylist: false
  },
  {
    id: 8,
    name: 'Daily Mix 1',
    type: 'playlist',
    owner: 'Spotify',
    tracks: 50,
    image: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb2e83342b0f36ba888c48a42d/1/en/default',
    isPlaylist: true
  },
];

function Library() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState(libraryItems);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setItems(filter === 'all' ? libraryItems : libraryItems.filter(item => item.type === filter));
  };

  return (
    <LibraryContainer>
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #8a4dff, #ff4081)',
        filter: 'blur(80px)',
        opacity: 0.3,
        zIndex: 0,
      }} />
      
      <LibraryHeader>
        <PageTitle>Your Library</PageTitle>
        <CreatePlaylistButton>
          <PlusIcon />
          Create playlist
        </CreatePlaylistButton>
      </LibraryHeader>

      <FilterContainer>
        <FilterButton 
          active={activeFilter === 'all'} 
          onClick={() => handleFilterChange('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'playlist'} 
          onClick={() => handleFilterChange('playlist')}
        >
          Playlists
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'artist'} 
          onClick={() => handleFilterChange('artist')}
        >
          Artists
        </FilterButton>
      </FilterContainer>

      {items.length > 0 ? (
        <LibraryContent>
          {items.map(item => (
            <CollectionCard key={item.id} isPlaylist={item.isPlaylist}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.type === 'playlist' ? `Playlist • ${item.owner}` : `Artist • ${item.followers} followers`}</p>
            </CollectionCard>
          ))}
        </LibraryContent>
      ) : (
        <EmptyLibrary>
          <h3>Create your first playlist</h3>
          <p>It's easy, we'll help you</p>
          <button>Create playlist</button>
        </EmptyLibrary>
      )}
    </LibraryContainer>
  );
}

export default Library;