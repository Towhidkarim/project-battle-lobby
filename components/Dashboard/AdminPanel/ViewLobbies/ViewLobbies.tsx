import { FetchLobbies } from '@/lib/actions/FetchLobbies';
import { redirect } from 'next/navigation';
import React from 'react';
import LobbyTable from './LobbyTable';

const ViewLobbies = async () => {
  const LobbyData = await FetchLobbies();
  if (!LobbyData?.data) redirect('/');
  return (
    <section>
      <h1 className='text-xl my-3'>Lobby Data</h1>
      <div>
        <LobbyTable lobbyData={LobbyData.data} />
      </div>
    </section>
  );
};

export default ViewLobbies;
