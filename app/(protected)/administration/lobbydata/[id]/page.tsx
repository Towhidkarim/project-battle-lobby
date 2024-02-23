import { auth } from '@/auth';
import LobbyInfo from '@/components/Dashboard/AdminPanel/LobbyInfo/LobbyInfo';
import connectMongoDB from '@/lib/mongoDB/database';
import { Lobbies, Users } from '@/lib/mongoDB/dbmodels';
import { TLobby, TUser } from '@/lib/types';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import React from 'react';

const Home = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) redirect('/');
  await connectMongoDB();
  const user: TUser | null = await Users.findOne(
    { email: session.user?.email },
    { role: 1 }
  );
  if (user && user.role !== 'admin' && user.role !== 'moderator')
    redirect('/dashboard');
  const lobbyData: TLobby | null = await Lobbies.findById(params.id);
  if (!lobbyData?.registrationData)
    return (
      <main className='min-h-svh bg-background'>
        <h1 className='mx-auto text-2xl'>Data Not Found</h1>
      </main>
    );

  return (
    <main className='min-h-svh bg-background'>
      <LobbyInfo
        dateString={format(lobbyData.lobbyStartTime, 'Pp')}
        // lobbyID={params.id.toString()}
        lobbyTitle={lobbyData.lobbyTitle.toString()}
        registrationData={lobbyData?.registrationData}
        // registrationData={JSON.parse(lobbyData?.registrationData)}
      />
    </main>
  );
};

export default Home;
