import { PlayerRef } from "@remotion/player";
import React, { createContext, useContext, useRef } from "react";

interface PlayerContextType {
  playerRef: React.RefObject<PlayerRef>;
  seekTo: (frameNumber: number) => void;
  play: () => void;
  pause: () => void;
  getCurrentFrame: () => number | undefined;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const playerRef = useRef<PlayerRef>(null);

  const seekTo = (frameNumber: number) => {
    playerRef.current?.seekTo(frameNumber);
  };

  const play = () => {
    playerRef.current?.play();
  };

  const pause = () => {
    playerRef.current?.pause();
  };

  const getCurrentFrame = () => {
    return playerRef.current?.getCurrentFrame();
  };

  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        seekTo,
        play,
        pause,
        getCurrentFrame,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
