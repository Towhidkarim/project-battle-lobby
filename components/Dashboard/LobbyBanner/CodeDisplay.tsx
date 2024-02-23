import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const CodeDisplay = ({
  code,
  password,
}: {
  code: string;
  password: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className='w-full my-3 bg-background/75 mx-auto rounded-xl p-4 text-center font-semibold text-white'>
        View Entry Code
      </DialogTrigger>
      <DialogContent className=' px-5'>
        <DialogHeader>
          <DialogTitle className='text-lg my-3'>
            Code for this Lobby
          </DialogTitle>
          <div className='flex flex-col justify-center items-center gap-4'>
            <span>
              Lobby Code: &nbsp; <b>{code}</b> <br />
            </span>
            <span>
              Lobby Password: &nbsp; <b>{password} </b>
            </span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CodeDisplay;
