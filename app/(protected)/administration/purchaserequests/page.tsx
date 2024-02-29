import { auth } from '@/auth';
import RequestsTable from '@/components/Dashboard/AdminPanel/TopupRequests/RequestsTable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import connectMongoDB from '@/lib/mongoDB/database';
import { PurchaseRequests, Users } from '@/lib/mongoDB/dbmodels';
import { TPurchaseRequest, TUser } from '@/lib/types';
import { redirect } from 'next/navigation';

export default async function Page() {
  await connectMongoDB();
  const session = await auth();
  if (!session) redirect('/');
  const userInfo: TUser | null = await Users.findOne({
    email: session.user?.email,
  });
  if (userInfo?.role !== 'admin') redirect('/');
  const data: TPurchaseRequest[] | null = await PurchaseRequests.find()
    .sort({ _id: -1 })
    .lean();
  const columns = [
    'UserName',
    'Email',
    'Package',
    'Package Price',
    'Transaction On',
    'Method',
    'TransactionID',
    'Approval',
  ];
  return (
    <main className='min-h-svh bg-background flex flex-col w-full'>
      <h1 className='text-center text-2xl font-semibold my-4'>
        Purchase Requests
      </h1>
      <ScrollArea>
        <RequestsTable columns={columns} data={data ?? undefined} />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </main>
  );
}
