'use client';

import DesignerSidebar from './DesignerSidebar';
import { useDroppable } from '@dnd-kit/core';
function Designer() {
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesinerDropArea: true,
    },
  });
  return (
    <div className='flex h-full w-full'>
      <div className='w-full p-4'>
        <div className='m-auto flex h-full max-w-[920px] flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background'>
          <p className='flex flex-grow items-center text-3xl font-bold text-muted-foreground'>
            Drop here
          </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
