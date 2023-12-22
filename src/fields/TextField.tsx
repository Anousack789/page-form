import { ElementType, FormElementProps } from '@/components/FormElement';
import { MdOutlineTextFields } from 'react-icons/md';
const type: ElementType = 'TextField';
export const TextFieldFormElement: FormElementProps = {
  type,
  designerComponent: () => <div>Designer component</div>,
  formConpoment: () => <div>Designer component</div>,
  propertiesComponent: () => <div>Designer component</div>,
  designerBtnElement: {
    icon: MdOutlineTextFields,
    label: 'Text Field',
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text Field',
      helperText: 'Helper Text',
      required: false,
      placeholder: 'Value here...',
    },
  }),
};
