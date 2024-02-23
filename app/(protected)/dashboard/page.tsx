import { auth } from '@/auth';
import DashboardNav from '@/components/Dashboard/DashboardNav/DashboardNav';
import DashboardHome from '@/components/Dashboard/DashboardTabs/DashboardHome';
import SideMenu from '@/components/Dashboard/SideMenu/SideMenu';
import { Tabs } from '@/components/ui/tabs';
import connectMongoDB from '@/lib/mongoDB/database';
import { Users } from '@/lib/mongoDB/dbmodels';
import { TUser } from '@/lib/types';
import { TabsContent } from '@/components/ui/tabs';
import { redirect } from 'next/navigation';
import { MdDashboard } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import EditProfile from '@/components/Dashboard/DashboardTabs/EditProfile/EditProfile';
import { SlideMenu } from '@/components/Dashboard/SideMenu/SlideMenu';

const Home = async () => {
  const session = await auth();
  if (!session?.user) redirect('/');
  await connectMongoDB();
  const userData: TUser | null = await Users.findOne(
    {
      email: session.user.email,
    },
    { password: 0 }
  ).lean();
  if (!userData) redirect('/');
  userData._id = userData._id?.toString();

  const tabsData = [
    {
      title: 'Home',
      icon: <MdDashboard />,
      component: <DashboardHome userData={userData} />,
    },
    {
      title: 'Lobbies',
      icon: <MdDashboard />,
      component: <DashboardHome userData={userData} />,
    },
    {
      title: 'Profile',
      icon: <FaUserCog />,
      component: <EditProfile userData={userData} />,
    },
  ];

  return (
    <main className='h-svh w-full bg-background'>
      <Tabs className='' defaultValue={tabsData[0].title}>
        <div className='flex'>
          <div className='w-1/4 hidden h-svh  lg:block border-r border-border min-w-80'>
            <SideMenu userData={userData} tabsData={tabsData} />
          </div>
          <div className='lg:w-3/4 w-full mx-auto h-full'>
            <DashboardNav userData={userData} />
            <div className='absolute top-9 left-6'>
              <SlideMenu tabsData={tabsData} userData={userData} />
            </div>
            {tabsData.map((data, index) => (
              <TabsContent
                className='md:px-6 px-3'
                value={data.title}
                key={index}
              >
                {data.component}
              </TabsContent>
            ))}
            {/* <p>hello</p> */}
          </div>
        </div>
      </Tabs>
    </main>
  );
};

export default Home;
