import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css';

interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

interface TranscriptSegment {
  timestamp: number;
  text: string;
}

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  // Sample data (replace with your actual data)
  const chapters: Chapter[] = [
    { id: '1', title: 'Introduction', startTime: 0, endTime: 180 },
    { id: '2', title: 'Custom Hooks Fundamentals', startTime: 180, endTime: 900 },
    { id: '3', title: 'Performance Optimization', startTime: 900, endTime: 1500 },
  ];

  const transcript: TranscriptSegment[] = [
    { timestamp: 0, text: 'Welcome to this lecture on Advanced React Patterns and Performance.' },
    { timestamp: 30, text: 'Today we will explore several key concepts that will help you write better React applications.' },
    { timestamp: 60, text: "Let's start with understanding custom hooks and their lifecycle." },
    { timestamp: 180, text: 'Custom hooks allow you to extract component logic into reusable functions.' },
  ];

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Control functions
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seekTo(percent * duration);
  };

  const skipForward = () => {
    seekTo(Math.min(currentTime + 15, duration));
  };

  const skipBackward = () => {
    seekTo(Math.max(currentTime - 15, 0));
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // Format time helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current chapter
  const getCurrentChapter = () => {
    return chapters.find(
      (chapter) => currentTime >= chapter.startTime && currentTime < chapter.endTime
    );
  };

  // Share timestamp
  const shareTimestamp = (timestamp: number) => {
    const url = `${window.location.origin}${window.location.pathname}?t=${timestamp}`;
    navigator.clipboard.writeText(url);
    alert('Timestamp link copied to clipboard!');
  };

  // Check for timestamp in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const timestamp = params.get('t');
    if (timestamp) {
      seekTo(parseInt(timestamp, 10));
    }
  }, []);

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="player-header">
        <h1>Advanced React Patterns and Performance</h1>
        <p className="instructor">Dr. Sarah Mitchell</p>
      </div>

      {/* Waveform placeholder */}
      <div className="waveform" onClick={handleProgressClick}>
        <div className="waveform-bars">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="waveform-bar"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        <div
          className="waveform-progress"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Progress bar */}
      <div className="progress-section">
        <span className="time">{formatTime(currentTime)}</span>
        <div className="progress-bar" onClick={handleProgressClick}>
          <div
            className="progress-fill"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className="progress-handle"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="control-btn" onClick={skipBackward}>
          ⏮
        </button>
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="control-btn" onClick={skipForward}>
          ⏭
        </button>
      </div>

      {/* Speed and Volume */}
      <div className="settings">
        <div className="speed-control">
          <label>Speed</label>
          <div className="speed-buttons">
            {[0.5, 1, 1.5, 2].map((rate) => (
              <button
                key={rate}
                className={`speed-btn ${playbackRate === rate ? 'active' : ''}`}
                onClick={() => changeSpeed(rate)}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
        <div className="volume-control">
          <label>🔊 Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab active">Transcript</button>
        <button className="tab">Chapters</button>
        <button className="tab">Playlist</button>
      </div>

      {/* Transcript */}
      <div className="transcript">
        {transcript.map((segment, index) => {
          const isActive =
            currentTime >= segment.timestamp &&
            (index === transcript.length - 1 || currentTime < transcript[index + 1].timestamp);

          return (
            <div
              key={index}
              className={`transcript-segment ${isActive ? 'active' : ''}`}
              onClick={() => seekTo(segment.timestamp)}
            >
              <div className="transcript-time">{formatTime(segment.timestamp)}</div>
              <div className="transcript-text">{segment.text}</div>
              <button
                className="share-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  shareTimestamp(segment.timestamp);
                }}
              >
                🔗
              </button>
            </div>
          );
        })}
      </div>

      {/* Chapters view (hidden by default) */}
      <div className="chapters" style={{ display: 'none' }}>
        {chapters.map((chapter) => {
          const isCurrent = getCurrentChapter()?.id === chapter.id;
          return (
            <div
              key={chapter.id}
              className={`chapter-card ${isCurrent ? 'active' : ''}`}
              onClick={() => seekTo(chapter.startTime)}
            >
              <h3>{chapter.title}</h3>
              <p>
                {formatTime(chapter.startTime)} - {formatTime(chapter.endTime)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AudioPlayer;
