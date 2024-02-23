import { auth } from '@/auth';
import connectMongoDB from '@/lib/mongoDB/database';
import { Users } from '@/lib/mongoDB/dbmodels';
import { TUser } from '@/lib/types';
import { redirect } from 'next/navigation';
import React from 'react';
import EditForm from './EditForm';

const EditProfile = async ({ userData }: { userData: TUser }) => {
  // const session = await auth();
  // if (!session) redirect('/');
  // await connectMongoDB();
  // const userInfo: TUser | null = await Users.findOne(
  //   { email: session.user?.email },
  //   { password: 0 }
  // );
  // if (!userInfo) redirect('/');
  // userInfo._id = userInfo._id?.toString();

  return (
    <section>
      <h1 className='text-2xl'>Settings</h1>
      <EditForm userData={userData} />
    </section>
  );
};

export default EditProfile;
