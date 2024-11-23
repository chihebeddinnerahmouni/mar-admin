import { lineSpinner } from 'ldrs'




const LoadingButton = () => {

   
    lineSpinner.register() 
    
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <l-line-spinner
        size="15"
        stroke="3"
        speed="1"
        color="white"
      ></l-line-spinner>
    </div>
  );
}

export default LoadingButton
