'use client';
import { TLobbyRegistrationData } from '@/lib/types';
import { utils, writeFile } from 'xlsx';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { FetchLobbieyWithID } from '@/lib/actions/FetchLobbyWithID';

const DownloadButton = ({
  data,
  dateString,
  lobbyTitle,
}: {
  data: TLobbyRegistrationData[];
  dateString: string;
  lobbyTitle: string;
}) => {
  const playersData = data.map((value) => ({
    Username: value.player_userName,
    IGN: value.playerIGN,
    UID: value.player_uid,
    Email: value.playerEmail,
    PhoneNumber: value.playerNumber,
  }));
  const downloadFunction = async () => {
    const book = utils.book_new();
    const worksheet = utils.json_to_sheet(playersData);
    utils.book_append_sheet(book, worksheet, lobbyTitle);

    writeFile(book, lobbyTitle + ' ' + dateString + '.xlsx');
  };
  return (
    <Button
      onClick={downloadFunction}
      className='mx-auto  p-6 font-semibold text-base my-4 rounded-2xl'
    >
      Download Data as Excel Sheet
    </Button>
  );
};

export default DownloadButton;
