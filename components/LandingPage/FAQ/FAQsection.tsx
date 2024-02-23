import React from 'react';
import { FAQs } from '@/lib/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQsection = () => {
  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-3xl mt-10 mb-5'>
        Frequently Asked Questions
      </h1>
      <Accordion type='single' className='md:w-1/2 w-full mx-auto' collapsible>
        {FAQs.map((item, index) => (
          <AccordionItem value={item.title}>
            <AccordionTrigger className='text-xl font-semibold text-center'>
              {item.title}
            </AccordionTrigger>
            <AccordionContent className='text-lg'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQsection;
