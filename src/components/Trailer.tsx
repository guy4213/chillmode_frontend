import React, { useEffect, useRef } from 'react';
import "./Trailer.css";

interface TrailerProps {
  trailer: string;
  src: string;
  alt: string;
}

export const Trailer: React.FC<TrailerProps> = ({ trailer, src, alt }) => {
  const playerRef = useRef<YT.Player | null>(null);
  const videoId = trailer ? trailer.split("v=")[1] : '';

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializeYouTubePlayer = () => {
    if (window.YT && typeof window.YT.Player === 'function') {
      playerRef.current = new window.YT.Player('trailer', {
        height: '315',
        width: '560',
        videoId: videoId,
        events: {
          'onReady': onPlayerReady
        }
      });
    }
  };

  const onPlayerReady = (event: YT.PlayerEvent) => {
    if (event.target && event.target.playVideo) {
      event.target.playVideo();
    }
  };

  const showTrailer = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const trailerElement = document.getElementById('trailer') as HTMLDivElement;
    trailerElement.style.display = 'block';

    if (!playerRef.current) {
      initializeYouTubePlayer();
    } else {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
    }
  };

  const hideTrailer = () => {
    const trailerElement = document.getElementById('trailer') as HTMLDivElement;
    if (playerRef.current && playerRef.current.pauseVideo) {
      playerRef.current.pauseVideo();
    }
    trailerElement.style.display = 'none';
  };

  const handleClicks = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    window.open(trailer, '_blank');
  };

  return (
    <div className="movie">
      <a href="#" className="movie-link" onMouseOver={showTrailer} onMouseOut={hideTrailer}>
        <img src={src} alt={alt} className="mb-1" height="183px" width="240px" onClick={handleClicks} />
      </a>
      <div className="trailer" id="trailer"></div>
    </div>
  );
};
