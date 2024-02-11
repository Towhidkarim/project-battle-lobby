import FAQsection from '@/components/FAQ/FAQsection';
import FooterSection from '@/components/Footer/FooterSection';
import Hero from '@/components/Hero/Hero';
import MobileApp from '@/components/MobileApp/MobileApp';
import Navbar from '@/components/NavBar/Navbar';
import SubHero from '@/components/SubHero/SubHero';
import TopUpHome from '@/components/TopUp/TopUpHome';
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
      <TopUpHome />
      <br />
      <MobileApp />
      <br />
      <FAQsection />
      <br />
      <FooterSection />
    </main>
  );
}
