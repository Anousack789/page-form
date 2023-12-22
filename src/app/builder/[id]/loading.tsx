import { LuLoader2 } from 'react-icons/lu';

function Loading() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <LuLoader2 className='h-12 w-12 animate-spin' />
    </div>
  );
}

export default Loading;
