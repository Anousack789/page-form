'use client';
import React from 'react';
import { FormElementProps } from '../FormElement';
import { Button } from '../ui/button';

interface Props {
  formElement: FormElementProps;
}
function DesignerSidebarBtnElement({ formElement }: Props) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button
      variant={'outline'}
      className='flex h-[120px] w-[120px] cursor-grab flex-col gap-2'
    >
      <Icon className='h-8 w-8 cursor-grab text-primary' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
}

export default DesignerSidebarBtnElement;
