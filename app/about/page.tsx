import FooterSection from '@/components/LandingPage/Footer/FooterSection';
import Navbar from '@/components/NavBar/Navbar';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <main className='min-h-svh w-screen bg-background'>
      <Navbar />
      <p className='w-full max-w-prose p-4 mx-auto'>
        Welcome to BattleLobby.com, where passion meets competition, and dreams
        transform into reality. Our platform is more than just a gaming arena;
        it's a gateway for aspiring players to embark on a journey towards
        professionalism. <br /> <br />
        At
        <Link href='/' className='font-semibold'>
          &nbsp;BattleLobby.com&nbsp;
        </Link>
        BattleLobby.com, we understand the fervor and dedication that gamers
        bring to the virtual battlefield. Our mission is to support and nurture
        this talent, providing a dynamic space for players to hone their skills,
        connect with like-minded individuals, and ultimately, ascend to
        professional gaming heights. <br />
        <br />
        What sets us apart is our commitment to elevating the gaming experience.
        We go beyond just hosting tournaments; we curate an environment that
        fosters growth and camaraderie. Whether you're a seasoned competitor or
        just starting, BattleLobby.com is your home for thrilling competitions
        and the chance to make your mark in the gaming world.
        <br />
        Our dedication to supporting players extends beyond the digital realm.
        We believe in recognizing and rewarding talent. Exciting prizes await
        those who dare to compete and excel. From cash rewards to exclusive
        gaming gear, we ensure that the victories achieved on BattleLobby.com
        are celebrated with the grandeur they deserve.
        <br />
        <Link href='/user/signin' className='font-semibold'>
          Join Us&nbsp;
        </Link>
        in shaping the future of esports. Whether you aim to compete at the
        highest level or simply enjoy the thrill of competitive gaming,
        BattleLobby.com is where your journey begins. Welcome to a community
        that values your passion and believes in your potential. Together, let's
        redefine what it means to be a gaming champion.
      </p>
      <FooterSection />
    </main>
  );
}
