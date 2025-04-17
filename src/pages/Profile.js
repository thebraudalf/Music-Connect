import React from 'react';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';

const ProfileContainer = styled.div`
  padding: 32px;
  margin-left: 280px;
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #2a2a3c 100%);
  color: white;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #8a4dff;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  h1 {
    font-size: 32px;
    margin: 0 0 8px 0;
  }
  
  p {
    color: #b3b3b3;
    margin: 0;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-size: 24px;
    margin: 0 0 4px 0;
  }
  
  p {
    color: #b3b3b3;
    margin: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
`;

const PlaylistCard = styled.div`
  background: #3a3a4c;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  
  h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
  }
  
  p {
    color: #b3b3b3;
    margin: 0;
    font-size: 14px;
  }
`;

const Profile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={user.profilePic} alt={user.name} />
        <ProfileInfo>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </ProfileInfo>
      </ProfileHeader>

      <StatsContainer>
        <StatItem>
          <h3>128</h3>
          <p>Playlists</p>
        </StatItem>
        <StatItem>
          <h3>2.4k</h3>
          <p>Followers</p>
        </StatItem>
        <StatItem>
          <h3>1.2k</h3>
          <p>Following</p>
        </StatItem>
      </StatsContainer>

      <Section>
        <h2>Recently Played</h2>
        <PlaylistGrid>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <PlaylistCard key={item}>
              <img src={`https://picsum.photos/200/200?random=${item}`} alt="Playlist" />
              <h3>Playlist {item}</h3>
              <p>By {user.name}</p>
            </PlaylistCard>
          ))}
        </PlaylistGrid>
      </Section>
    </ProfileContainer>
  );
};

export default Profile;