import Image from "next/image";

const laporankasus = () => {
  return (
    <>
      {/* Search feature */}
      <form action="" className="flex flex-col justify-center w-full w-max-[95%] gap-10 my-10 items-center">
        <h1 className="text-center my-[32px] text-landspire_blue text-3xl font-semibold">Case Report</h1>
        <input type="text" className="border-landspire_dark_gray border-2 py-3 px-5 w-[620px] rounded-xl box-border" placeholder="Find case report..." />
        <p className="text-landspire_blue hover:text-landspire_yellow  cursor-pointer">Make a report</p>
      </form>

      <div>
        {/* title laporan */}
        <div className="w-full flex justify-center">
          <h2 className="text-xl font-semibold w-[90%]">New Reports</h2>
        </div>

        {/* content */}
        <div className="my-5 flex flex-col gap-5">

          <div className="flex w-full justify-center box-border">
            <div className="flex flex-row bg-landspire_white w-[95%] rounded-lg p-10 gap-5 items-center drop-shadow-md">
              <Image src="/assets/imgs/report/report1.png" alt="" width={160} height={160} layout="auto" className="rounded-lg" />

              <div className="flex flex-col gap-1">
                <p>ID Report | SR2401120041</p>
                <h3 className="font-semibold text-xl my-2">Land grabbing by residents in Serang City by unknown partiesenal</h3>
                <p>Land owned by residents in Serang City, Walantaka District was seized by individuals claiming the land as theirs. The residents concerned already have a valid certificate for the land. Legal proceedings are required for the encroaching party.</p>
                <p><strong>Location</strong>: Jl. Raya Jakarta RT.10/RW.7, Kec. Walantaka, Kota Serang, Banten, 11732,  Special feature: next to Alfamart</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3>Status Laporan</h3>
                <h3 className="font-semibold text-landspire_red">Waiting</h3>
                <p>Laporan diterima ATR/BPN Kota Serang</p>
                <p className="font-semibold">12 Jul 2024 | 07.46</p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center box-border">
            <div className="flex flex-row bg-landspire_white w-[95%] rounded-lg p-10 gap-5 items-center drop-shadow-md">
              <Image src="/assets/imgs/report/report2.jpg" alt="" width={160} height={160} layout="auto" className="rounded-lg" />

              <div className="flex flex-col gap-1">
                <p>ID Report | JK2401121049</p>
                <h3 className="font-semibold text-xl my-2">Land sale and purchase fraud in Cengkareng District</h3>
                <p>Residents in West Jakarta City, Cengkareng District, became victims of fraud in land sale and purchase transactions. The perpetrators used fake documents to sell the land. Immediately arrest and prosecute the perpetrators of fraud according to applicable law</p>
                <p><strong>Location</strong>:Jl. Raya Kamal RT.10/RW.7, Kec. Cengkareng, Jakarta Barat, 11732,  Special features: smart home side</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3>Status Laporan</h3>
                <h3 className="font-semibold text-landspire_blue">Coordinating</h3>
                <p>Laporan diterima ATR/BPN Kota Serang</p>
                <p className="font-semibold">12 Jul 2024 | 07.46</p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center box-border">
            <div className="flex flex-row bg-landspire_white w-[95%] rounded-lg p-10 gap-5 items-center drop-shadow-md">
              <Image src="/assets/imgs/report/report1.png" alt="" width={160} height={160} layout="auto" className="rounded-lg" />

              <div className="flex flex-col gap-1">
                <p>ID Report | SR2401120041</p>
                <h3 className="font-semibold text-xl my-2">Land grabbing by residents in Serang City by unknown partiesenal</h3>
                <p>Land owned by residents in Serang City, Walantaka District was seized by individuals claiming the land as theirs. The residents concerned already have a valid certificate for the land. Legal proceedings are required for the encroaching party.</p>
                <p><strong>Location</strong>: Jl. Raya Jakarta RT.10/RW.7, Kec. Walantaka, Kota Serang, Banten, 11732,  Special feature: next to Alfamart</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3>Status Laporan</h3>
                <h3 className="font-semibold text-landspire_red">Waiting</h3>
                <p>Laporan diterima ATR/BPN Kota Serang</p>
                <p className="font-semibold">12 Jul 2024 | 07.46</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default laporankasus