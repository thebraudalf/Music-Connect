import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  PlayIcon, 
  PauseIcon, 
  SkipPreviousIcon, 
  SkipNextIcon,
  ShuffleIcon,
  RepeatIcon,
  VolumeIcon
} from './Icons';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  z-index: 100;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    margin-right: 14px;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    
    .title {
      font-size: 14px;
      font-weight: 500;
      color: white;
      margin-bottom: 4px;
    }
    
    .artist {
      font-size: 11px;
      color: #b3b3b3;
    }
  }
`;

const PlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .buttons {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
    
    .play-pause {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      cursor: pointer;
      
      svg {
        fill: black;
      }
    }
    
    .control-button {
      color: #b3b3b3;
      cursor: pointer;
      
      &:hover {
        color: white;
      }
    }
  }
  
  .progress {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #b3b3b3;
    font-size: 11px;
    
    .progress-bar {
      flex: 1;
      height: 4px;
      background-color: #535353;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      
      .progress-fill {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
      background: linear-gradient(90deg, #8a4dff, #ff4081);
        border-radius: 2px;
        
        &:hover {
      color: #8a4dff;
    }
      }
    }
  }
`;

const ExtraControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  
  .volume-control {
    display: flex;
    align-items: center;
    width: 125px;
    gap: 8px;
    color: #b3b3b3;
    
    .volume-bar {
      flex: 1;
      height: 4px;
      background-color: #535353;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      
      .volume-fill {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(90deg, #8a4dff, #ff4081);
        border-radius: 2px;
        
         &:hover {
      color: #8a4dff;
    }
      }
    }
  }
`;

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // percentage
  const [volume, setVolume] = useState(65); // percentage
  
  return (
    <PlayerContainer>
      <TrackInfo>
        <img src="https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b" alt="Album Cover" />
        <div className="details">
          <div className="title">Blinding Lights</div>
          <div className="artist">The Weeknd</div>
        </div>
      </TrackInfo>
      
      <PlayerControls>
        <div className="buttons">
          <div className="control-button">
            <ShuffleIcon />
          </div>
          <div className="control-button">
            <SkipPreviousIcon />
          </div>
          <div className="play-pause" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
          <div className="control-button">
            <SkipNextIcon />
          </div>
          <div className="control-button">
            <RepeatIcon />
          </div>
        </div>
        
        <div className="progress">
          <span>1:23</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span>3:20</span>
        </div>
      </PlayerControls>
      
      <ExtraControls>
        <div className="volume-control">
          <VolumeIcon />
          <div className="volume-bar">
            <div className="volume-fill" style={{ width: `${volume}%` }}></div>
          </div>
        </div>
      </ExtraControls>
    </PlayerContainer>
  );
}

export default Player; 