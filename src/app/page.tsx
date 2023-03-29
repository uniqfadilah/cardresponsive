'use client'
import Flag from "@/components/flag";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({})
  const [descVisibility, setDescVisibility] = useState<boolean>(false);
  const [numberVisible, setNumberVisible] = useState<boolean>(true)

  const fetchData = async () => {
    const response = await fetch("/mock.json");
    const jsonData = await response.json();
    setData(jsonData)
  };
  useEffect(() => {

    fetchData();
  }, []);
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  }

  const handleAnonymize = useMemo(() => {
    if (!data.description) return ""
    return data.description.replace(/\d{4}\s?\d{4}/g, (match: any) => {
      const firstFourDigits = match.substring(0, 4);
      const realNumber = match.replace(/\s/g, ""); // Removes space from real number
      return `<span class="text-blue-500 hover:text-blue-700 cursor-pointer" realNumber="${realNumber}" >${firstFourDigits} XXXX</span>`;
    });
  }, [data.description])

  return (
    <main className='container mx-auto flex  h-screen items-center justify-center'>
      {data.pic && <div className="w-[343px] sm:w-[554px] shadow bg-white   flex flex-col relative">
        <div className="absolute -left-2 top-1"><Flag /></div>
        <div className="flex   rounded-t overflow-hidden">
          <Image src={data?.pic[0]} alt="img" width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '272px', objectFit: "cover" }}
            className="w-full "

          />
        </div>
        <div className="p-[16px] sm:p-[24px] ">
          <div className="bg-white  flex sm:flex-row flex-col gap-1 sm:gap-2">
            <div className="  flex-1 text-[#1A2258]">
              <div className="flex space-x-4 items-center">

                <i className="i-building" />
                <div>
                  <p className="font-bold text-[16px] sm:text-xl">{data.title}</p>
                  <p className="text-xs sm:text-sm text-[#787D9C]">{data.address}</p>
                </div>
              </div>
              <div className="py-[12px] leading-snug text-sm sm:text-base">
                <p>{data.project_type} · {data.year} · {data.ownership_type}</p>
                <p>{data.availabilities_label}</p>
              </div>


            </div>

            <div className="flex sm:flex-col sm:items-end items-center space-x-2 sm:space-x-0 ">
              <p className="font-bold text-base sm:text-[19px]">{formatCurrency(data.psf_min)} - {formatCurrency(data.psf_max)} psf</p>
              <p className="text-xs sm:text-sm text-[#787D9C] text-right">{data.subprice_label}</p>
            </div>

          </div>
          <div className="flex justify-end mt-2">
            <button onClick={() => setDescVisibility((e) => !e)} className="font-semibold text-[#1757D7] text-sm sm:text-base">See description</button>
          </div>

          <div onClick={(e) => { setNumberVisible((e) => !e) }} className={`text-sm sm:text-base mt-2 ${descVisibility ? '' : 'hidden'}`} dangerouslySetInnerHTML={{ __html: numberVisible ? handleAnonymize : data.description }} />



        </div>



      </div>}

    </main >
  )
}
