import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TLobbyRegistrationData } from '@/lib/types';
import { cn } from '@/lib/utils';
import DownloadButton from './DownloadButton';
import { ScrollArea } from '@/components/ui/scroll-area';

const LobbyInfo = ({
  dateString,
  registrationData,
  lobbyTitle,
}: {
  dateString: string;
  registrationData: TLobbyRegistrationData[];
  lobbyTitle: string;
}) => {
  const data: TLobbyRegistrationData[] = registrationData.map((value, i) => ({
    player_id: value.playerEmail,
    player_userName: value.player_userName,
    player_uid: value.player_uid,
    playerEmail: value.playerEmail,
    playerNumber: value.playerNumber,
    playerIGN: value.playerIGN,
  }));
  const columns = [
    {
      key: 'player_userName',
      label: 'Player UserName',
    },
    {
      key: 'playerIGN',
      label: 'IGN',
    },
    {
      key: 'player_uid',
      label: 'UID',
    },
    {
      key: 'playerEmail',
      label: 'Email',
    },
    {
      key: 'playerNumber',
      label: 'Phone Number',
    },
  ];
  const tableRowClass = 'w-1/5 p-4 text-base font-normal overflow-hidden';

  // const downloadFunction = () => {
  //   const book = utils.book_new();
  //   const worksheet = utils.json_to_sheet(data);
  //   utils.book_append_sheet(book, worksheet, lobbyTitle);

  //   writeFile(book, lobbyTitle + '.xlsx');
  // };

  return (
    <div className='p-4 w-full flex flex-col justify-center items-center'>
      <DownloadButton
        dateString={dateString ?? ''}
        lobbyTitle={lobbyTitle}
        data={data}
      />
      {/* <Button className='mx-auto  p-6 font-semibold text-base my-4 rounded-2xl'>
        Download Data
      </Button> */}
      <div className='w-full flex rounded-t-3xl bg-foreground text-background font-semibold justify-between'>
        {columns.map((value, index) => (
          <span className='w-1/5 p-4 text-lg' key={index}>
            {value.label}
          </span>
        ))}
      </div>
      <ScrollArea className='w-full max-h-[70vh]'>
        {data?.map((value, index) => {
          const {
            playerEmail,
            playerIGN,
            player_uid,
            player_userName,
            playerNumber,
          } = value;
          return (
            <div
              key={index}
              className={cn(
                'w-full flex font-semibold justify-between',
                index % 2 == 0 ? 'bg-foreground/5' : ''
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(tableRowClass, 'text-start overflow-hidden')}
                  >
                    {player_userName}
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white'>
                    <p className='text-base'>{player_userName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className={tableRowClass}>{playerIGN}</span>
              <span className={cn(tableRowClass, 'capitalize')}>
                {player_uid}
              </span>
              <span className={tableRowClass}>{playerEmail}</span>
              {/* <span className={tableRowClass}>{playerEmail}</span> */}
              <span className={tableRowClass}>{playerNumber}</span>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default LobbyInfo;
