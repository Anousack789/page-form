'use client';
import { TextFieldFormElement } from '@/fields/TextField';

export type ElementsType = 'TextField';
export type FormElements = {
  type: ElementsType;
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formConpoment: React.FC;
  propertiesComponent: React.FC;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  construct: (id: string) => FormElementInstance;
};

type FormElementTypes = {
  [key in ElementsType]: FormElements;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementTypes = {
  TextField: TextFieldFormElement,
};
