'use client';

import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { DesignerSidebarBtnElementDragOverlay } from '../Designer/DesignerSidebarBtnElement';
import { ElementsType, FormElements } from '../FormElements';

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  let node = <div>No drag overlay</div>;
  const isDesignerSidebarBtnElement =
    draggedItem?.data?.current?.isDesignerBtnElement;
  if (isDesignerSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <DesignerSidebarBtnElementDragOverlay formElement={FormElements[type]} />
    );
  }
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
