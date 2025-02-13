"use client"
import Image from 'next/image';
import Link from 'next/link';
import style from "./style.module.css";

const Hero = () => {
  return (
    <>
      <div className='relative h-100 w-full overflow-hidden'>
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${style.hero} gap-5`}>
          <div className='flex flex-col justify-center items-center'>
            <h1 className="text-landspire_white">Land Legal Certainty</h1>
            <h1 className={`${style.penekanan} text-landspire_yellow`}>Easier Without the Hassle</h1>
          </div>

          <h3 className='text-landspire_white'>Consult your problems with AI Bot!</h3>

          <div className='relative'>
            <div className={`${style.fancyButton}`}></div>
            <Link href="ChatBot">
              <button className={`${style.button} bg-landspire_yellow font-semibold`}>Let's Consult</button>
            </Link>
          </div>

          <span className='mt-10 text-landspire_white'><p>4.9/5 ~ Review from 100+ land owners</p></span>
        </div>
        <div className={`${style.gradient} w-full h-full absolute`}></div>
        <Image src="/assets/imgs/hero.png" layout="responsive" width={500} height={500} alt="hero" />
      </div>
    </>
  )
}

export default Hero;
