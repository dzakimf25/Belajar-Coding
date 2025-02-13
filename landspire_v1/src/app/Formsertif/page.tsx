"use client"

import Image from "next/image";
import Header from "@/app/components/Header";
import { useContext, useState } from "react";

import { LandspireContext } from '@/app/context/contex'
import { useRouter } from 'next/navigation'
import { client } from '@/app/libs/sanity'
import { contractABI, contractAddress } from '@/app/libs/constant'
import { ethers } from 'ethers'

import { pinJSONToIPFS, pinFileToIPFS, deleteFileToIPFS, deleteJSONToIPFS } from '@/app/libs/pinata'

declare let window: any

let metamask: any

if (typeof window !== 'undefined') {
  metamask = window.ethereum
}

interface Metadata {
  name: string
  certificates_id: string
  nik: string
  file: string
}

interface HeaderObject {
  key: string | undefined
  value: string | undefined
}

const getEthereumContract = async () => {

  const provider = new ethers.BrowserProvider(metamask)
  const accounts = await provider.listAccounts()
  const signer = await provider.getSigner(accounts[0].address)

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}

const Formsertif = () => {
    const [change, isChange] = useState(false)
    const { currentAccount, setAppStatus } = useContext(LandspireContext)
    const [status, setStatus] = useState('initial')
    const router = useRouter()

    

     const mint = async ({namaPemilik, CertificatesID, CertificateFile, NIK, ownershipRights, dateOfIssuance, landAddress, landArea}) => {
      if (!namaPemilik || !NIK || !CertificateFile) return
      setStatus('loading')
  
      const pinataMetaData = {
        name: `${namaPemilik} - ${CertificatesID}`,
      }
  
      const ipfsFileHash = await pinFileToIPFS(CertificateFile, pinataMetaData)
  
      const fileMetaData: Metadata = {
        name: namaPemilik,
        nik: NIK,
        certificates_id: CertificatesID,
        file: `ipfs://${ipfsFileHash}`,
      }
  
      const pinataMetaDataJSON = {
        "name": `${namaPemilik} - JSON`,
        "nik": `${NIK}`,
        "certificates_id": `${CertificatesID}`,
        "file": `ipfs://${ipfsFileHash}`,
        "attributes": [
          {
            "trait_type": "Classification",
            "value": "Off-Chain (IPFS)"
          }
        ]
      }    
  
      const ipfsJsonHash = await pinJSONToIPFS(fileMetaData, pinataMetaDataJSON)
  
      const contract = await getEthereumContract()
  
      try {
        const transactionParameters = {
          to: contractAddress,
          from: currentAccount,
          data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
        }
  
        metamask.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        })

        const certificateDoc = {
          _type: 'certificates',
          _id: CertificatesID,
          certificates_id: CertificatesID,
          name_owner: namaPemilik,
          nik: NIK,
          ownership_rights: ownershipRights,
          date_of_issuance: dateOfIssuance,
          certificate_file: ipfsFileHash,
          isCertificateNft: true,
          land_address: landAddress,
          land_area: landArea,
          timestamp: new Date(Date.now()).toISOString(),
          account: {
            _key: CertificatesID,
            _ref: currentAccount,
            _type: 'reference',
          },
        }
    
        await client.createIfNotExists(certificateDoc)
    
        await client
          .patch(currentAccount)
          .setIfMissing({ certificates: [] })
          .insert('after', 'certificates[-1]', [
            {
              _key: CertificatesID,
              _ref: CertificatesID,
              _type: 'reference',
            },
          ])
          .commit()
  
        setStatus('finished')
  
      } catch (error: any) {
        console.log(error)
        console.log("Menolak Pembayaran");
  
        if (ipfsFileHash) {
          await deleteFileToIPFS(ipfsFileHash)
        }
  
        if (ipfsJsonHash) {
          await deleteJSONToIPFS(ipfsJsonHash)
        }
  
        setStatus('finished')
      }
  
  
    }

    function dataMasuk(e) {
        const file = e.target;
    
        // Check if any file selected
        for (let i = 0; i <= file.files.length - 1; i++) {
            const fileSize = file.files.item(i).size
            const actfileSize = Math.round((fileSize / 1024))
    
            if (actfileSize > 25096) {
                document.getElementById("warning").innerText = "File Terlalu Besar!"
                e.target.value = "";
            } else {
                document.getElementById("warning").innerText = ""
                isChange(!change)
            }
        }

    }        
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event?.preventDefault();

        let dataList = {};            
        const formData = new FormData(event.currentTarget)
        for (let data of formData) {
            dataList[data[0]] = data[1]
            console.log(dataList)
        }
        mint(dataList)
    }

    return (
        <div className=" my-8 mx-12">
          <h1 className="text-center my-[72px] text-landspire_blue text-3xl font-semibold">Form of Land Rights Certificates</h1>
            {/* <Header textHeader="Digitization of Land Rights Certificates"/> */}

            <form onSubmit={onSubmit} className="form mt-8 grid grid-cols-1 lg:grid-cols-3 justify-center">
                <div className="uploadCertificate flex flex-col p-4 gap-4 w-fit">
                    <p>UPLOAD CERTIFICATE</p>
                    <div className={`input gap-2 flex flex-col`}>
                        <label htmlFor="certificateUpload" className={`cursor-pointer ${change ? "hidden" : "visible"}`}>
                            <Image
                                src="/upload.png"
                                width={250}
                                height={250}
                                alt="Error"
                            />
                        </label>
                        <p id="warning" className="text-landspire_red"></p>
                        <input accept="application/pdf" className={change ? "visible" : "hidden"} type="file" name="CertificateFile" id="certificateUpload" onChange={dataMasuk}/>
                    </div>
                </div>
                <div className="form_input bg-white p-4 rounded-md">
                    <div className="flex flex-col gap-2 p-4">
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="name">Name<span className="text-landspire_red">*</span></label>
                            <input className="border-2 border-gray-300 rounded-md px-3 py-1" type="text" name="namaPemilik" id="name" required/>
                        </div>
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="nik">NIK<span className="text-landspire_red">*</span></label>
                            <input className="border-2 border-gray-300 rounded-md px-3 py-1" type="text" name="NIK" id="nik" required/>
                        </div>
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="certificateId">Certificate ID<span className="text-landspire_red">*</span></label>
                            <input className="border-2 border-gray-300 rounded-md px-3 py-1" type="text" name="CertificatesID" id="certificateId" required/>
                        </div>
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="name">Ownership Rights<span className="text-landspire_red">*</span></label>
                            <select className="border-2 border-gray-300 rounded-md p-1" name="ownershipRights" id="ownershipRights" required>
                                <option value="Freehold">Freehold</option>
                                <option value="Leasehold">Leasehold</option>
                                <option value="Land Use Rights">Land Use Rights</option>
                            </select>
                        </div>
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="dateOfIssuance">Date of Issuance<span className="text-landspire_red">*</span></label>
                            <input className="border-2 border-gray-300 rounded-md px-3 py-1" type="date" name="dateOfIssuance" id="dateOfIssuance" required/>
                        </div>
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="landAddress">Land Address<span className="text-landspire_red">*</span></label>
                            <input className="border-2 border-gray-300 rounded-md px-3 py-1" type="text" name="landAddress" id="landAddress" required/>
                        </div>
                        <div className="input gap-2 flex flex-col">
                            <label htmlFor="landArea">Land Area<span className="text-landspire_red">*</span></label>
                            <input className="border-2 border-gray-300 rounded-md px-3 py-1" type="text" name="landArea" id="landArea" required/>
                        </div>
                        <div className="submitbutton mt-2">
                            <button type="submit" className="block w-[100%] bg-landspire_blue text-white rounded-md p-2">Submit</button>
                        </div>
                    </div>
                </div>
                <div className="previewCertificate p-4 pr-[5rem] lg:pl-[5rem] flex flex-col gap-4">
                    <p>PREVIEW CERTIFICATE</p>
                    <div className="preview h-[30rem] border-2 border-gray-400">

                    </div>
                </div>
            </form>
        </div>
    )
};

export default Formsertif;