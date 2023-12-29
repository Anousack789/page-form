'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { FormElementInstance, FormElements } from '../FormElements';
import useDesigner from '../hooks/useDesigner';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
interface Props {
  element: FormElementInstance;
}
function DesignerElementWrapper({ element }: Props) {
  const DesignerElement = FormElements[element.type].designerComponent;
  const [mouseIsOver, setMouseIsOver] = useState(false);
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

  const { removeElement } = useDesigner();
  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      className='relative flex h-[120px] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer'
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className={'absolute h-1/2 w-full rounded-t-md'}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={'absolute bottom-0 h-1/2 w-full rounded-b-md'}
      />
      {mouseIsOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              className='flex h-full justify-center rounded-md rounded-l-none border bg-red-500'
              variant={'outline'}
              onClick={(e) => {
                e.stopPropagation();
                console.log('hello world');
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className='h-6 w-6' />
            </Button>
          </div>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-sm text-muted-foreground'>
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className='absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary'></div>
      )}
      <div
        className={cn(
          'pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2',
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary'></div>
      )}
    </div>
  );
}

export default DesignerElementWrapper;
