import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import SideMenu from './SideMenu';
import { TUser } from '@/lib/types';

export function SlideMenu({
  userData,
  tabsData,
}: {
  userData: TUser;
  tabsData: {
    title: string;
    icon: React.ReactNode;
    component: React.ReactNode;
  }[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id='slideMenu'
          variant='ghost'
          className='lg:hidden text-4xl p-1'
        >
          <CgMenuLeftAlt />
        </Button>
      </SheetTrigger>
      <SheetContent>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <SideMenu tabsData={tabsData} userData={userData} />
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type='submit'>Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
