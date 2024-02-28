import FAQsection from '@/components/LandingPage/FAQ/FAQsection';
import FooterSection from '@/components/LandingPage/Footer/FooterSection';
import Hero from '@/components/LandingPage/Hero/Hero';
import MobileApp from '@/components/LandingPage/MobileApp/MobileApp';
import Navbar from '@/components/NavBar/Navbar';
import SubHero from '@/components/LandingPage/SubHero/SubHero';
import TopUpHome from '@/components/LandingPage/TopUp/TopUpHome';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='bg-background min-h-svh'>
      <Navbar />
      <br />
      <Hero />
      <br />
      <SubHero />
      <br /> <br />
      {/* <TopUpHome /> */}
      <br />
      <MobileApp />
      <br />
      <FAQsection />
      <br />
      <FooterSection />
    </main>
  );
}
