const LoadingFrame = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingFrame;
