import React from 'react';
import EventForm from './EventForm';

const CreateEvent = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold'>Create New Event</h1>
      <EventForm />
    </section>
  );
};

export default CreateEvent;
