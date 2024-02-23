import Image from 'next/image';
import demoBanner from '@/assets/demo-banner.jpg';
import { IoPeople, IoTicket } from 'react-icons/io5';
import CountDown from './CountDown';
import { EntranceDialogue } from './EntranceDialogue';
import { TLobby, TUser } from '@/lib/types';
import { format } from 'date-fns';
import CodeDisplay from './CodeDisplay';

const LobbyBanner = async ({
  lobbyData,
  userData,
}: {
  lobbyData: TLobby;
  userData: TUser;
}) => {
  const LobbyData = {
    lobbyTitle: 'New Game Lobby',
    gameName: 'Game Name',
    caption: 'some small description ',
    entryFee: 50,
    maxCapacity: 10,
    currentlyEntered: 6,
    tags: ['FFA', '1vAll'],
    startTime: new Date(),
    endTime: new Date(Date.now() + 3600000),
  };
  const {
    _id,
    lobbyTitle,
    gameName,
    caption,
    maxCapacity,
    currentlyEntered,
    lobbyStartTime,
    registrationData,
    lobbyCreationTime,
    entryFee,
    credentials,
    tags,
  } = lobbyData;
  if (!_id) return;
  //   const timeData = timeLeft(new Date(LobbyData.endTime));
  const credentialsAvailable = credentials?.code && credentials.password;

  return (
    <label className='group relative'>
      <div className='mx-5 select-none cursor-pointer group-active:opacity-90 transition-all outline-foreground/30 relative border rounded-xl min-h-52 min-w-[80%] border-border overflow-hidden'>
        <Image
          alt='lobby'
          src={demoBanner}
          className='h-full absolute object-cover '
        />
        <div className=' bg-gradient-to-r  from-black to-white h-full absolute w-full opacity-60'></div>
        <div className='p-4 z-10 absolute top-0 h-full flex flex-col justify-between w-full'>
          <h1 className='font-bold my-2 text-2xl capitalize'>{lobbyTitle}</h1>
          <p>{caption}</p>
          <div className='w-full flex justify-between items-center'>
            <div className='font-semibold bg-background/60 md:text-lg outline outline-1 outline-foreground/40 rounded-full p-1 px-4 md:min-w-52 w-48 text-center '>
              <CountDown endTime={lobbyStartTime} />
            </div>
            <div className='flex text-sm gap-2 justify-center items-center'>
              <div className='flex gap-2 absolute top-3 right-0 mr-4 md:m-0 md:static'>
                {tags?.map((value, index) => (
                  <span
                    key={index}
                    className='bg-muted text-foreground px-4 font-semibold rounded-2xl p-0.5'
                  >
                    {value}
                  </span>
                ))}
              </div>
              <span className='bg-background inline-flex justify-center items-center gap-2 px-3 font-semibold rounded-2xl p-0.5'>
                <span className='text-2xl'>
                  <IoTicket />
                </span>
                {!entryFee || entryFee == 0 ? 'Free' : entryFee}
              </span>
              <span className='bg-primary p-0.5 inline-flex gap-2 justify-center items-center px-3 rounded-2xl font-semibold text-foreground'>
                <span className='text-2xl'>
                  <IoPeople />
                </span>
                {currentlyEntered}/{maxCapacity}
              </span>
            </div>
          </div>
          {!userData.lobbiesRegistered.includes(_id.toString()) ? (
            <EntranceDialogue
              lobbyID={_id?.toString() ?? ''}
              caption={caption}
              entryFee={entryFee}
              gameName={gameName}
              lobbyTitle={lobbyTitle}
              startTime={format(lobbyStartTime, 'Pp')}
            />
          ) : !credentialsAvailable ? (
            <span className='w-full my-3 bg-background/75 mx-auto rounded-xl p-4 text-center font-semibold text-white'>
              Registered, Waiting for code
            </span>
          ) : (
            <CodeDisplay
              code={credentials.code}
              password={credentials.password}
            />
          )}
        </div>
      </div>
      <div className='grid place-items-center mx-5'></div>
    </label>
  );
};

export default LobbyBanner;
