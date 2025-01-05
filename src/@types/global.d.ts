// src/global.d.ts-for trailer purposes
declare global {
  declare module '*.module.scss' {
    const styles: { [className: string]: string };
    export default styles;
  }
    namespace YT {
      interface Player {
        // Define all required properties and methods for the player
        new (elementId: string, options: any): Player;
        playVideo(): void;
        pauseVideo(): void;
        seekTo(seconds: number, allowSeekAhead: boolean): void;
        destroy(): void;
      }
  
      interface PlayerEvent {
        target: Player;
      }
    }
  
    interface Window {
      YT: typeof YT;
      onYouTubeIframeAPIReady: () => void;
    }
  }

  export {};

 