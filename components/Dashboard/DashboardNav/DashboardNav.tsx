import { TUser } from '@/lib/types';
import { IoTicket } from 'react-icons/io5';
import { CgMenuLeftAlt } from 'react-icons/cg';
const DashboardNav = async ({ userData }: { userData: TUser }) => {
  const { userName, ticketBalance } = userData;

  return (
    <nav className='h-16  flex justify-between px-5 items-center my-6'>
      <span className='text-2xl flex gap-5 justify-center items-center font-semibold'>
        <label
          htmlFor='slideMenu'
          className='lg:hidden opacity-0 active:opacity-0 text-4xl'
        >
          <CgMenuLeftAlt />
        </label>
        Welcome Back, {userName}
      </span>
      <div className='flex justify-center items-center gap-5'>
        {/* <span className='text-lg font-bold mx-2'>{userName}</span> */}
        <span className='flex justify-center items-center gap-2 text-xl border-2 rounded-xl px-2 font-semibold'>
          <IoTicket />
          {ticketBalance ? ticketBalance : 0}
        </span>
      </div>
    </nav>
  );
};

export default DashboardNav;
