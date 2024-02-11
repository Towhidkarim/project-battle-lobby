import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { TbCurrencyTaka } from 'react-icons/tb';
import { cn } from '@/lib/utils';

type Cardprops = {
  packName: string;
  packValue: number;
  price: number;
  perks: string[];
  special?: boolean;
};

const TopUpCard = ({
  packName,
  packValue,
  price,
  perks,
  special,
}: Cardprops) => {
  return (
    <Card
      className={cn('border-4 w-72 py-5', special && 'border-primary py-10')}
    >
      <CardHeader>
        <CardTitle
          className={cn('text-center text-lg', special ? 'text-2xl' : '')}
        >
          {packName} Pack
        </CardTitle>
        {special && (
          <span className='text-center animate-pulse'>Most Popular</span>
        )}
      </CardHeader>
      <CardContent>
        <div>
          <p className='text-2xl font-semibold text-foreground text-center'>
            <span className='text-4xl'>{packValue}</span>
            &nbsp;Tickets
          </p>
          <div className='text-center text-lg flex items-center justify-center'>
            <span className='text-2xl'>
              <TbCurrencyTaka />
            </span>
            {price}/- only
          </div>
        </div>
        <div className='mx-auto w-full grid place-items-center my-4'>
          <Button
            variant={special ? 'default' : 'outline'}
            className={cn(
              'text-center rounded-full py-4 font-semibold mx-auto text-foreground border-primary',
              special ? 'text-foreground' : ''
            )}
          >
            Purchase {packName}
          </Button>
        </div>
        <hr className='border-border h-1 my-2' />
        <ul className='text-center text-base text-muted-foreground'>
          {perks.map((perk, index) => (
            <li key={index}>{perk}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopUpCard;
