import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '@/components/FormElements';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdOutlineTextFields } from 'react-icons/md';
const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text Field',
  helperText: 'Helper text',
  required: true,
  placeHolder: 'Value here...',
};

export const TextFieldFormElement: FormElements = {
  type,
  designerComponent: DesignerComponent,
  formConpoment: () => <div>Designer component</div>,
  propertiesComponent: () => <div>Designer component</div>,
  designerBtnElement: {
    icon: MdOutlineTextFields,
    label: 'Text Field',
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className='flex w-full flex-col gap-2'>
      <Label>
        {element.extraAttributes.label}
        {element.extraAttributes.required && '*'}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className='text-[0.8rem] text-muted-foreground'>{helperText}</p>
      )}
    </div>
  );
}
