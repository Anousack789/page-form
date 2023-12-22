'use client';
import { TextFieldFormElement } from '@/fields/TextField';

export type ElementType = 'TextField';
export type FormElementProps = {
  type: ElementType;
  designerComponent: React.FC;
  formConpoment: React.FC;
  propertiesComponent: React.FC;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  construct: (id: string) => FormElementInstance;
};

type FormElementTypes = {
  [key in ElementType]: FormElementProps;
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementTypes = {
  TextField: TextFieldFormElement,
};
