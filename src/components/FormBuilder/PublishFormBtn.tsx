import { LuArrowUpFromLine } from 'react-icons/lu';
import { Button } from '../ui/button';

function PublishFormBtn() {
  return (
    <Button className='gap-2 bg-gradient-to-t from-indigo-400 to-cyan-400 text-white'>
      <LuArrowUpFromLine size={16} />
      Publish
    </Button>
  );
}

export default PublishFormBtn;
