import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
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

const WelcomeHeading = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 32px;
  background: linear-gradient(45deg, #8a4dff, #ff4081);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PlaylistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
`;

const PlaylistCard = styled.div`
  background: rgba(42, 42, 60, 0.9);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 77, 255, 0.1);

  &:hover {
    transform: translateY(-4px);
    background: rgba(138, 77, 255, 0.1);
    box-shadow: 0 8px 32px rgba(138, 77, 255, 0.2);

    img {
      transform: scale(1.05);
    }

    &::after {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;
    transition: transform 0.3s ease;
  }

  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #ffffff;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem;
    color: #b3b3b3;
    line-height: 1.5;
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(138, 77, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 48px 0 24px;
  color: #8a4dff;
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 80%;
    background: linear-gradient(180deg, #8a4dff, #ff4081);
    border-radius: 2px;
  }
`;

const recentPlaylists = [
  {
    id: 1,
    title: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music.',
    imgUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebcdce7620dc940db079bf4952/1/en/default',
  },
  {
    id: 2,
    title: 'Chill Vibes',
    description: 'Chill lofi and hip-hop beats.',
    imgUrl: 'https://i.scdn.co/image/ab67706f00000002ca5a7517656cae7c12ce7578',
  },
  {
    id: 3,
    title: 'Today\'s Top Hits',
    description: 'Drake is on top of the Hottest 50!',
    imgUrl: 'https://i.scdn.co/image/ab67706f00000002822795292c1bb9eda1441c56',
  },
  {
    id: 4,
    title: 'RapCaviar',
    description: 'New music from Drake, Travis Scott and more.',
    imgUrl: 'https://i.scdn.co/image/ab67706c0000da8436ea3a15c04a4b0821958ceb',
  },
  {
    id: 5,
    title: 'Rock Classics',
    description: 'Rock legends & epic songs that continue to inspire generations.',
    imgUrl: 'https://i.scdn.co/image/ab67706f00000002b5d03b4e641cea9d5541f2b9',
  },
];

const recommendedPlaylists = [
  {
    id: 6,
    title: 'Mood Booster',
    description: 'Feel-good music to boost your mood!',
    imgUrl: 'https://i.scdn.co/image/ab67706f000000025096da562e96ce1f0035ee2e',
  },
  {
    id: 7,
    title: 'Peaceful Piano',
    description: 'Peaceful piano to help you slow down, breathe, and relax.',
    imgUrl: 'https://i.scdn.co/image/ab67706f00000002ca5a7517656cae7c12ce7578',
  },
  {
    id: 8,
    title: 'Focus Flow',
    description: 'Uptempo instrumental hip hop beats.',
    imgUrl: 'https://i.scdn.co/image/ab67706f000000024cb74d2fdd6ea6fbc867c192',
  },
  {
    id: 9,
    title: 'R&B Mix',
    description: 'Smooth R&B from past and present.',
    imgUrl: 'https://seed-mix-image.spotifycdn.com/v6/img/r&b/0du5cEVh5yTK99bb035W55/en/default',
  },
  {
    id: 10,
    title: 'Deep Focus',
    description: 'Keep calm and focus with ambient and post-rock music.',
    imgUrl: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5',
  },
];


function Home() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <HomeContainer>
      {/* Add background blobs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #8a4dff, #ff4081)',
        filter: 'blur(80px)',
        opacity: 0.3,
        zIndex: 0,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #ff4081, #8a4dff)',
        filter: 'blur(80px)',
        opacity: 0.3,
        zIndex: 0,
      }} />

      <WelcomeHeading>{greeting()}</WelcomeHeading>

      <SectionTitle>Recently played</SectionTitle>
      <PlaylistsGrid>
        {recentPlaylists.map(playlist => (
          <PlaylistCard key={playlist.id}>
            <img src={playlist.imgUrl} alt={playlist.title} />
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
          </PlaylistCard>
        ))}
      </PlaylistsGrid>

      <SectionTitle>Made for you</SectionTitle>
      <PlaylistsGrid>
        {recommendedPlaylists.map(playlist => (
          <PlaylistCard key={playlist.id}>
            <img src={playlist.imgUrl} alt={playlist.title} />
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
          </PlaylistCard>
        ))}
      </PlaylistsGrid>
    </HomeContainer>
  );
}

export default Home;