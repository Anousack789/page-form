import { LuSave } from 'react-icons/lu';
import { Button } from '../ui/button';

function SaveFormBtn() {
  return (
    <Button variant={'outline'} className='h-full gap-2'>
      <LuSave size={16} />
      Save
    </Button>
  );
}

export default SaveFormBtn;
