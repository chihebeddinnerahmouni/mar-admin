import { zoomies } from 'ldrs'






const LoadingLine = () => {
    zoomies.register()
  return (
    <div className="w-full h-full flex justify-center items-center">
      <l-zoomies
        size="80"
        stroke="5"
        bg-opacity="0.1"
        speed="1.4"
        color="#FF385C"
      ></l-zoomies>
    </div>
  );
}

export default LoadingLine
