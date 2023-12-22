'use client';

import { useDroppable } from '@dnd-kit/core';
import { FormElementInstance, FormElements } from '../FormElements';

interface Props {
  element: FormElementInstance;
}
function DesignerElementWrapper({ element }: Props) {
  const DesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  return (
    <div className='relative flex h-[120px] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer'>
      <div className='absolute h-1/2 w-full rounded-t-md bg-green-500'></div>
      <div className='absolute bottom-0 h-1/2 w-full rounded-b-md bg-red-500'></div>
      <div className='pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2'>
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default DesignerElementWrapper;
