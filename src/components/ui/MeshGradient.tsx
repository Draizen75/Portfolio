export default function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 dark:opacity-20">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/40 dark:bg-blue-600/40 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/40 dark:bg-violet-600/40 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-400/40 dark:bg-indigo-600/40 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
    </div>
  );
}
