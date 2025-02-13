const FormBalikNama = () => {
    return (
        <>
        <div className="w-full flex flex-col items-center">
            <h1 className="text-center my-[72px] text-landspire_blue text-3xl font-semibold">Form Transfer Land Rights</h1>

            <form action="" className="bg-landspire_white w-[90%] mb-10 flex flex-col items-center p-10 drop-shadow-md rounded-md">
                <div className="flex">
                    <div className="flex flex-col gap-5 w-1/2 p-5">
                        <span className="flex flex-col">
                            <label htmlFor="">Wallet Address</label>
                            <input type="text" className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="Wallet address..." />
                        </span>
                        
                        <span>
                            <label htmlFor="">Full Name</label>
                            <input type="text"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="Full name..." />
                        </span>

                        <span>
                            <label htmlFor="">Phone/WhatsApp</label>
                            <input type="text"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="Phone/Whatsapp..." />
                        </span>

                        <span>
                            <label htmlFor="">NIK</label>
                            <input type="text"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="NIK..." />
                        </span>

                        <span>
                            <label htmlFor="">Nomor Kartu Keluarga</label>
                            <input type="text"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="Nomor Kartu Keluarga" />
                        </span>

                        <span>
                            <label htmlFor="">NPWP</label>
                            <input type="text"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="NPWP..." />
                        </span>
                    </div>

                    <div className="flex flex-col gap-5 w-1/2 p-5">
                        <span>
                            <label htmlFor="">Sertifikat Tanah Asli</label>
                            <input type="file"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="" />
                        </span>

                        <span>
                            <label htmlFor="">Surat Permohonan Balik Nama</label>
                            <input type="file"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="" />
                        </span>

                        <span>
                            <label htmlFor="">Akta Jual Beli</label>
                            <input type="file"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="" />
                        </span>

                        <span>
                            <label htmlFor="">Bukti Pelunasan BPHTB</label>
                            <input type="file"  className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="" />
                        </span>

                        <span>
                            <label htmlFor="">SPPT PBB Tahun Berjalan</label>
                            <input type="file" className="w-full border border-landspire_dark_gray px-3 py-1 rounded-md" required placeholder="" />
                        </span>
                    </div>
                </div>

                <input type="submit" className="w-full bg-landspire_blue w-1/3 text-landspire_white px-3 py-2 rounded-md" />
            </form>            
        </div>
        </>
    )
}

export default FormBalikNama