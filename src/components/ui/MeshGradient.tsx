import InteractiveCanvas from './InteractiveCanvas';

/**
 * MeshGradient Component
 * 
 * Provides an immersive background composed of interactive particles
 * and slow-animating glowing color blobs.
 */
export default function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Interactive dynamic particle canvas */}
      <InteractiveCanvas />
      
      {/* Glowing atmospheric mesh colors */}
      <div className="absolute inset-0 opacity-45 dark:opacity-25">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] rounded-full bg-blue-400/35 dark:bg-blue-600/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen md:animate-blob" />
        <div className="absolute top-[25%] right-[-10%] w-[45vw] h-[45vw] min-w-[280px] min-h-[280px] rounded-full bg-violet-400/30 dark:bg-violet-600/15 blur-[100px] mix-blend-multiply dark:mix-blend-screen md:animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] min-w-[350px] min-h-[350px] rounded-full bg-indigo-400/35 dark:bg-indigo-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen md:animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}
