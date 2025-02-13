'use client';

import style from "./style.module.css";
import { useContext, useState } from "react";
import { LandspireContext } from '@/app/context/contex'
import { client } from '@/app/libs/sanity'

const Table = () => {
  const { currentAccount, getNftCertificate } = useContext(LandspireContext)
  const [input, setInput] = useState('')
  const [resultCertificate, setResultCertificate] = useState([])

  const fetchCertificates = async (e) => {
    e.preventDefault()
    const address = input.toLowerCase()
    const query = `
      *[_type == "certificates" && account->walletAddress == "${address}"]{
        "account": account->{walletAddress},
        certificates_id,
        name_owner,
        ownership_rights,
        land_address,
        land_area,
        certificate_file,
        isCertificateNft,
        timestamp
      }|order(timestamp desc)
    `

    const params = { address }

    const sanityResponse = await client.fetch(query, params)

    const newCertificates = await Promise.all(sanityResponse.map(async item => {
      const certificateUrl = await getNftCertificate(
        item.certificate_file,
        item.isCertificateNft,
      )

      if (item.isCertificateNft) {
        return {
          certificates_id: item.certificates_id,
          name_owner: item.name_owner,
          ownership_rights: item.ownership_rights,
          land_address: item.land_address,
          land_area: item.land_area,
          isCertificateNft: item.isCertificateNft,
          timestamp: item.timestamp,
          certificate: certificateUrl,
          account: {
            walletAddress: item.account.walletAddress,
          },
        }
      } else {
        return {
          certificates_id: item.certificates_id,
          name_owner: item.name_owner,
          ownership_rights: item.ownership_rights,
          land_address: item.land_address,
          land_area: item.land_area,
          isCertificateNft: item.isCertificateNft,
          timestamp: item.timestamp,
          account: {
            walletAddress: item.account.walletAddress,
          },
        }
      }
    }))

    setResultCertificate(newCertificates)
  }

  return (
    <>
      {/* Search feature */}
      <form onSubmit={fetchCertificates} 
      action="" className="flex justify-center w-full max-w-[95%] gap-2 mb-10">
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className="border-landspire_dark_gray border-2 py-3 px-5 w-[720px] rounded-xl box-border" placeholder="Find wallet address..." />
        <input type="submit" value="Search" className="bg-landspire_blue text-landspire_white border-2 py-3 px-5 rounded-xl box-border" />
      </form>

      {/* Table */}
      <div className="w-full flex justify-center drop-shadow-lg" id="data-table">
        <div className={`w-[95%] ${style.table_container} bg-landspire_white box-border px-5 pt-5 pb-7 rounded-lg`}>
          {resultCertificate.length > 0 ? (
            <table className={`${style.custom_table}`}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Owner</th>
                  <th>Certificate Number</th>
                  <th>Ownership Rights</th>
                  <th>Land Area</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {resultCertificate.map((certificate, index) => (
                  <tr key={certificate.certificates_id}>
                    <td>{index + 1}</td>
                    <td>{certificate.name_owner}</td>
                    <td>{certificate.certificates_id}</td>
                    <td>{certificate.ownership_rights}</td>
                    <td>{certificate.land_area}</td>
                    <td>{certificate.land_address}</td>
                    <td>{new Date(certificate.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-semibold italic">The search result will be shown here</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Table;
