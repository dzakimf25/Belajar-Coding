"use client"
import { LandspireContext } from "@/app/context/contex";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {
    const { connectWallet } = useContext(LandspireContext)

    return (
        <nav className="bg-landspire_blue min-h-[40px] flex justify-between px-[72px] py-4 text-landspire_white">
            <div className="flex flex-row gap-3">
                <img src="/assets/logos/logo.png" alt="lanspire" width={32} height={32} />
                <p className="title italic text-xl">Landspire</p>
            </div>
            <div className="list_menu">
                <ul className="flex gap-7 px-3">
                    <li className="hover:bg-[#424ab6] py-1 px-2 rounded-lg duration-300"><Link href="/">Home</Link></li>
                    <li className="hover:bg-[#424ab6] py-1 px-2 rounded-lg duration-300"><Link href="/">Service</Link></li>
                    <li className="hover:bg-[#424ab6] py-1 px-2 rounded-lg duration-300"><Link href="/">Contact</Link></li>
                    <li className="hover:bg-[#424ab6] py-1 px-2 rounded-lg duration-300"><button  onClick={connectWallet}>Connect Wallet</button></li>
                    <li className="bg-[#424ab6] py-1 px-2 rounded-lg duration-300"><button onClick={connectWallet}>Subscribe</button></li>
                    {/* <li className="hover:bg-[#424ab6] py-1 px-2 rounded-lg duration-300"><Link href="/">Login</Link></li> */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;