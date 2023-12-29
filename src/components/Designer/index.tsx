'use client';

import { cn } from '@/lib/utils';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '../FormElements';
import DesignerSidebar from './DesignerSidebar';
import useDesigner from '../hooks/useDesigner';
import { idGenerator } from '@/lib/isGenerator';
import DesignerElementWrapper from './DesignerElementWrapper';
function Designer() {
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesinerDropArea: true,
    },
  });
  const { elements, addElement } = useDesigner();
  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !event) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type as ElementsType;
        const newElement =
          FormElements[type as ElementsType].construct(idGenerator());
        addElement(0, newElement);
      }
    },
  });
  return (
    <div className='flex h-full w-full'>
      <div className='w-full p-4'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            `m-auto flex h-full max-w-[920px] flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background`,
            droppable.isOver && 'ring-2 ring-primary/20'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className='flex flex-grow items-center text-3xl font-bold text-muted-foreground'>
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className='p4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className='flex w-full flex-col gap-5 p-4'>
              {elements.map((element) => {
                return (
                  <DesignerElementWrapper key={element.id} element={element} />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
