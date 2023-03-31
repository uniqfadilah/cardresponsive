'use client'
import React, { useMemo, useState } from 'react'

const Description = ({description}:any) => {  
  const [descVisibility,setDescVisibility] = useState(false)
  const [numberVisible,setNumberVisible] = useState(true)
 
  const anonnumber = useMemo(()=>{
    if(!description) return ""
    return description.replace(/\d{4}\s?\d{4}/g, (match: any) => {
        const firstFourDigits = match.substring(0, 4);
        const realNumber = match.replace(/\s/g, ""); // Removes space from real number
        return `<span class="hover:text-blue-700 cursor-pointer" realNumber="${realNumber}" >${firstFourDigits}XXXX</span>`;
      });
  },[])
  return (
      <>
      <div className="flex justify-end mt-2">
            <button onClick={() => setDescVisibility((e) => !e)} className="font-semibold text-[#1757D7] text-sm sm:text-base">See description</button>
          </div>

          <div onClick={(e) => { setNumberVisible((e) => !e) }} className={`text-sm sm:text-base mt-2 ${descVisibility ? '' : 'hidden'}`} dangerouslySetInnerHTML={{ __html: numberVisible ? anonnumber : description }} /> </>

  )
}

export default Description