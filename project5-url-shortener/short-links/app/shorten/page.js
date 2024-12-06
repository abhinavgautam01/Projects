"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'

const poppins = localFont({
  src: "../fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});


const Shorten = () => {
  const [url, seturl] = useState("")
  const [shorturl, setShorturl] = useState("")
  const [generated, setGenerated] = useState("")

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shorturl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
        seturl("")
        setShorturl("")
        alert(result.message)

      })
      .catch((error) => console.error(error));
  }


  return (
    <div className='mx-auto max-w-lg bg-slate-200 my-16 p-8 rounded-lg flex flex-col gap-4'>
      <h1 className={`font-bold text-2xl ${poppins.className}`}>Generate Your Short URLs</h1>
      <div className='flex flex-col gap-2'>
        <input value={url} className='px-4 py-2 focus:outline-slate-700 rounded-md' type="text" placeholder='Enter your URL' onChange={e => (seturl(e.target.value))} />
        <input value={shorturl} className='px-4 py-2 focus:outline-slate-700 rounded-md' type="text" placeholder='Enter your preferred short URL text' onChange={e => (setShorturl(e.target.value))} />
        <button onClick={generate} className='bg-slate-600 hover:bg-slate-500 hover:text-[17px] transition-all shadow-lg rounded-lg p-3 py-2 font-bold text-white my-3'>Generate</button>
      </div>
      {generated && <>
        <span className={`${poppins.className} font-bold text-lg`}>Your Link: </span>
        <code>
          <Link className='font-bold text-blue-600 transition-all hover:text-[17px]' target="_blank" href={generated}>{generated}</Link>
        </code>
      </>}
    </div>
  )
}

export default Shorten
