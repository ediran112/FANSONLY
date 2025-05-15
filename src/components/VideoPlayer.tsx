
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, VolumeX, Volume2, Maximize, Minimize, Loader } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  isVertical?: boolean;
}

const VideoPlayer = ({ videoUrl, posterUrl, isVertical = false }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isYouTubeVideo, setIsYouTubeVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  let controlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    // Check if it's a YouTube URL
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      setIsYouTubeVideo(true);
      return;
    }
    
    setIsYouTubeVideo(false);
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!video) return;
      const progressValue = (video.currentTime / video.duration) * 100;
      setProgress(progressValue);
      setCurrentTime(video.currentTime);
    };

    const setVideoData = () => {
      if (!video) return;
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoData);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoData);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [videoUrl]);

  const togglePlay = () => {
    if (isYouTubeVideo) {
      // Send play/pause command to YouTube iframe
      if (iframeRef.current) {
        try {
          const message = isPlaying 
            ? JSON.stringify({ event: 'command', func: 'pauseVideo' }) 
            : JSON.stringify({ event: 'command', func: 'playVideo' });
          iframeRef.current.contentWindow?.postMessage(message, '*');
          setIsPlaying(!isPlaying);
        } catch (error) {
          console.error('Failed to control YouTube player', error);
        }
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const value = parseFloat(e.target.value);
    const newTime = (value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(value);
  };

  const toggleFullScreen = () => {
    if (!playerRef.current) return;

    if (!isFullScreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  const handleVideoClick = () => {
    togglePlay();
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeVideoId = isYouTubeVideo ? getYouTubeVideoId(videoUrl) : null;

  return (
    <div 
      ref={playerRef} 
      className={`relative w-full rounded-md overflow-hidden group bg-black ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isYouTubeVideo ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&color=purple`}
          className="w-full h-full object-cover"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          className={`w-full h-full object-cover cursor-pointer ${isVertical ? 'object-contain bg-black' : 'object-cover'}`}
          onClick={handleVideoClick}
        />
      )}
      
      {/* Play button overlay when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-primary/90 hover:bg-primary text-white rounded-full w-16 h-16"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 flex flex-col transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress bar */}
        <div className="w-full mb-2 flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 rounded-full appearance-none bg-gray-700 cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, rgba(100, 100, 100, 0.5) ${progress}%, rgba(100, 100, 100, 0.5) 100%)`,
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-primary hover:bg-white/10 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-primary hover:bg-white/10 rounded-full"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              
              <div className="w-24 hidden md:block">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 rounded-full appearance-none bg-gray-700 cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${isMuted ? 0 : volume * 100}%, rgba(100, 100, 100, 0.5) ${isMuted ? 0 : volume * 100}%, rgba(100, 100, 100, 0.5) 100%)`,
                  }}
                />
              </div>
            </div>
            
            <span className="text-white text-xs md:text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-primary hover:bg-white/10 rounded-full"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
