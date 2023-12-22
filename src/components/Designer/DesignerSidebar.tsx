'use client';

import React from 'react';
import { FormElements } from '../FormElement';
import DesignerSidebarBtnElement from './DesignerSidebarBtnElement';

function DesignerSidebar() {
  return (
    <aside className='flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4'>
      Elements
      <DesignerSidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
}

export default DesignerSidebar;
