import { LuView } from 'react-icons/lu';
import { Button } from '../ui/button';

function PreviewDialogBtn() {
  return (
    <Button variant={'outline'} className='h-full gap-2'>
      <LuView size={16} />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn;
