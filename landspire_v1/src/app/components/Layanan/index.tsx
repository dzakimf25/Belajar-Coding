"use client"

import Image from 'next/image';
import Link from 'next/link';
import style from './style.module.css';

const Layanan = () => {
  return (
    <>
      <div className="mb-[100px] mt-[58px] flex flex-row w-full justify-center items-center gap-7">
        <div className={`${style.layanan} bg-landspire_white p-3 w-[280px] rounded-md flex flex-col gap-5 drop-shadow-md`}>
          <div className='w-full truncate'>
            <Image src="/assets/imgs/layanan1.png" width={500} height={500} alt='layanan' className='rounded-sm hover:scale-[110%] duration-500' />
          </div>
          <div>
            <h1>Digitization of Land Rights Certificates</h1>
            <Link href="Formsertif" className='text-xs hover:text-landspire_yellow duration-300 text-landspire_blue'>Learn more</Link>
          </div>
        </div>

        <div className={`${style.layanan} bg-landspire_white p-3 w-[280px] rounded-md flex flex-col gap-5 drop-shadow-md`}>
          <div className='w-full truncate'>
            <Image src="/assets/imgs/layanan2.png" width={500} height={500} alt='layanan' className='rounded-sm hover:scale-[110%] duration-500' />
          </div>
          <div>
            <h1>Transfer Land Rights</h1>
            <br />
            <Link href="FormBalikNama" className='text-xs hover:text-landspire_yellow duration-300 text-landspire_blue'>Learn more</Link>
          </div>
        </div>

        <div className={`${style.layanan} bg-landspire_white p-3 w-[280px] rounded-md flex flex-col gap-5 drop-shadow-md`}>
          <div className='w-full truncate'>
            <Image src="/assets/imgs/layanan3.png" width={500} height={500} alt='layanan' className='rounded-sm hover:scale-[110%] duration-500' />
          </div>
          <div>
            <h1>Reporting Land Law Cases</h1>
            <br />
            <Link href="laporankasus" className='text-xs hover:text-landspire_yellow duration-300 text-landspire_blue'>Learn more</Link>
          </div>
        </div>

        <div className={`${style.layanan} bg-landspire_white p-3 w-[280px] rounded-md flex flex-col gap-5 drop-shadow-md`}>
          <div className='w-full truncate'>
            <Image src="/assets/imgs/layanan4.png" width={500} height={500} alt='layanan' className='rounded-sm hover:scale-[110%] duration-500' />
          </div>
          <div>
            <h1>Certificates</h1>
            <br />
            <Link href="search" className='text-xs hover:text-landspire_yellow duration-300 text-landspire_blue'>Search certificate</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layanan