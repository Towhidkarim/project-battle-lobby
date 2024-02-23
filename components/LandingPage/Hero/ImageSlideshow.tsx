import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import demo from '@/assets/demo-hero.webp';

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';

const ImageSlideshow = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className='w-full'
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={demo}
                alt=''
                className='h-full w-full border rounded-2xl'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className='py-2 text-center text-sm text-muted-foreground'>
        Slide {current} of {count}
      </div> */}
    </div>
  );
};

export default ImageSlideshow;
