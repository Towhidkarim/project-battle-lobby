import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { MenuItems } from '@/lib/constants';
import Link from 'next/link';

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' className='text-xl'>
          <CgMenuLeftAlt />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        {/* <SheetClose asChild>
          <Button variant='ghost'>
            <IoClose />
          </Button>
        </SheetClose> */}
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold'>Menu</SheetTitle>
        </SheetHeader>
        <div className='h-full w-full grid place-content-center'>
          <div className='grid m-auto place-items-center gap-2 -translate-y-14 w-max text-center'>
            {MenuItems.map((item, index) => (
              <>
                <Link
                  href={item.url}
                  key={index}
                  className='w-full p-4 hover:bg-foreground/20 rounded-xl transition active:scale-95'
                >
                  {item.title}
                </Link>
              </>
            ))}
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
