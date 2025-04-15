import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../components/Icons';

const SearchContainer = styled.div`
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

const SearchHeader = styled.div`
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`;

const SearchInputContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin-bottom: 32px;
  
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    color: #8a4dff;
    z-index: 2;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border-radius: 30px;
  border: none;
  background: rgba(64, 64, 64, 0.8);
  color: white;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(138, 77, 255, 0.2);
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #8a4dff;
    background: rgba(64, 64, 64, 1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const GenresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px;
  position: relative;
  z-index: 1;
`;

const GenreCard = styled.div`
  background: linear-gradient(
    135deg,
    ${props => props.color} 0%,
    ${props => props.color + 'CC'} 100%
  );
  border-radius: 12px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(138, 77, 255, 0.2);
    
    img {
      transform: rotate(25deg) scale(1.1);
    }
  }
  
  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    z-index: 2;
    position: relative;
    line-height: 1.2;
  }
  
  img {
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: -15px;
    right: -15px;
    transform: rotate(25deg);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
    opacity: 0.9;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 24px;
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
const ResultsSection = styled.div`
  margin-top: 40px;
`;

const TrackList = styled.div`
  margin-top: 20px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #282828;
  }
  
  img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
  
  .track-info {
    flex: 1;
    
    .track-name {
      font-size: 16px;
      margin-bottom: 4px;
    }
    
    .track-artist {
      font-size: 14px;
      color: #b3b3b3;
    }
  }
  
  .track-album {
    color: #b3b3b3;
    font-size: 14px;
    margin-right: 16px;
  }
  
  .track-duration {
    color: #b3b3b3;
    font-size: 14px;
    margin-right: 10px;
  }
`;

// Mock genres data
const genres = [
  { id: 1, name: 'Pop', color: '#8D67AB', image: 'https://t.scdn.co/images/0a74d96e091a495bb09c0d83210910c3' },
  { id: 2, name: 'Hip-Hop', color: '#BA5D07', image: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe' },
  { id: 3, name: 'Rock', color: '#E61E32', image: 'https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg' },
  { id: 4, name: 'Dance/Electronic', color: '#DC148C', image: 'https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995f3f9c8930a56_0_0_274_274.jpg' },
  { id: 5, name: 'R&B', color: '#27856A', image: 'https://t.scdn.co/images/9378062ced4e466981bb01f9e4da3ac5' },
  { id: 6, name: 'Indie', color: '#608108', image: 'https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg' },
  { id: 7, name: 'Podcasts', color: '#006450', image: 'https://t.scdn.co/media/categories/podcasts/your-daily-podcasts_274x274.jpg' },
  { id: 8, name: 'Latin', color: '#E1118C', image: 'https://t.scdn.co/images/6a46dbea763f4def9e4a136deba345a6' },
];

// Mock tracks for search results
const mockTracks = [
  { id: 1, name: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', duration: '3:53', img: 'https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96' },
  { id: 2, name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', img: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b' },
  { id: 3, name: 'Dance Monkey', artist: 'Tones and I', album: 'The Kids Are Coming', duration: '3:29', img: 'https://i.scdn.co/image/ab67616d0000b273c6f7af36cfa9fc2d9f8fb6c4' },
  { id: 4, name: 'Someone You Loved', artist: 'Lewis Capaldi', album: 'Divinely Uninspired...', duration: '3:02', img: 'https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2' },
  { id: 5, name: 'bad guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL...', duration: '3:14', img: 'https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57' },
];

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      setSearchResults(mockTracks.filter(track => 
        track.name.toLowerCase().includes(query.toLowerCase()) || 
        track.artist.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SearchContainer>
      {/* Background effects */}
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
      
      <SearchHeader>
        <SectionTitle>Search</SectionTitle>
        <SearchInputContainer>
          <SearchIcon />
          <SearchInput 
            type="text" 
            placeholder="What do you want to listen to?" 
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchInputContainer>
      </SearchHeader>

      {searchQuery.length === 0 ? (
        <>
          <SectionTitle>Browse All</SectionTitle>
          <GenresGrid>
            {genres.map(genre => (
              <GenreCard key={genre.id} color={genre.color}>
                <h3>{genre.name}</h3>
                <img src={genre.image} alt={genre.name} />
              </GenreCard>
            ))}
          </GenresGrid>
        </>
      ) : (
        <ResultsSection>
          <SectionTitle>{searchResults.length ? 'Top Results' : 'No results found'}</SectionTitle>
          <TrackList>
            {searchResults.map(track => (
              <TrackItem key={track.id}>
                <img src={track.img} alt={track.name} />
                <div className="track-info">
                  <div className="track-name">{track.name}</div>
                  <div className="track-artist">{track.artist}</div>
                </div>
                <div className="track-album">{track.album}</div>
                <div className="track-duration">{track.duration}</div>
              </TrackItem>
            ))}
          </TrackList>
        </ResultsSection>
      )}
    </SearchContainer>
  );
}

export default Search;