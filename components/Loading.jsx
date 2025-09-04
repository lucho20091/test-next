export default function Loading() {
  return (
    <div className="grow">
      <div className="pt-0 md:pt-8 flex justify-center items-center h-full">
        <div className="relative w-16 h-16">
          {/* Outer circle */}
          <div className="absolute w-full h-full border-4 border-indigo-950/20 rounded-full"></div>
          {/* Animated circle */}
          <div className="absolute w-full h-full border-4 border-t-purple-400 border-r-purple-400 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
