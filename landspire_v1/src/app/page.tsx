"use client"
import { useContext } from "react";
import HeroImage from "./components/Hero";
import Layanan from "./components/Layanan";
import { LandspireContext } from "./context/contex";

export default function Home() {
  // const { checkIfWalletIsConnected } = useContext(LandspireContext)

  // checkIfWalletIsConnected()

  return (
    <>
      <HeroImage />

      <h1 className="mt-[58px] text-center text-3xl font-semibold text-landspire_blue">Our Services</h1>

      <Layanan />
    </>
  );
}