"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import localFont from 'next/font/local';

const poppins = localFont({
    src: "../fonts/Poppins-ExtraBold.ttf",
    variable: "--font-geist-sans",
    weight: "100 900",
  });

const Generate = () => {

  const searchParams = useSearchParams()

  // const [link, setlink] = useState("")
  // const [linktext, setlinktext] = useState("")
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")
  const [generated, setGenerated] = useState("")

  const handleChange = (index, link, linktext) => { 
    setLinks((initialLinks)=>{
      return initialLinks.map((item, i)=>{
        if (i==index){
          return {link, linktext}
        }
        else {
          return item
        }
      })
    })
   }

   const addLink = () => { 
    setLinks(links.concat([{link: "", linktext: ""}]))
    }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links, 
      "handle": handle,
      "pic": pic,
      "desc": desc
    });

    console.log(raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

   const r = await fetch("http://localhost:3000/api/add", requestOptions)
   const result = await r.json()
   if(result.success){ 
     toast.success(result.message)
     setLinks([{link:"", linktext:""}])
     setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${handle}`)
     setpic("")
     sethandle("")
     setdesc("")
    }
    else{
      toast.error(result.message)
    }
 
       
  }


  return (
    <div className='bg-[#E9C0E9] min-h-screen grid grid-cols-2 pt-24'>
     
      <div className="col1 flex justify-center items-center flex-col text-gray-900">
        <div className='flex flex-col gap-5 my-8'>
          <h1 className='font-bold text-4xl'>Create your BitTree</h1>
          <div className="item">

            <h2 className='font-semibold text-2xl'>Step 1: Claim your Handle</h2>
            <div className='mx-4'>
              <input value={handle || ""} onChange={e=>{sethandle(e.target.value)}} className=' font-semibold px-4 py-2 my-2 focus:outline-pink-500 rounded-full'
                type="text" placeholder='Choose a Handle' />
            </div>
          </div>
          <div className="item">
            <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
            {links && links.map((item, index)=>{
              return <div key={index} className='mx-4'>
              <input value={item.linktext || ""} onChange={e=>{handleChange(index, item.link, e.target.value)}} className=' font-semibold px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link text' />
              <input value={item.link || ""} onChange={e=>{handleChange(index, e.target.value, item.linktext)}} className=' font-semibold px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full'
                type="text" placeholder='Enter link' />
            </div>
            })}
              <button onClick={()=> addLink()} className='p-5 py-2 mx-2 hover:bg-slate-800 bg-slate-900 text-white font-bold rounded-3xl'>+ Add Link</button>
          </div>

          <div className="item">
            <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
            <div className='mx-4 flex flex-col'>
              <input value={pic || ""} onChange={e=>{setpic(e.target.value)}} className=' font-semibold px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link to your Picture' />
              <input value={desc || ""} onChange={e=>{setdesc(e.target.value)}} className=' font-semibold px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter description' />
              <button disabled={desc == "" || pic == "" || handle == "" || links[0].linktext == "" || links[0].link== ""} onClick={()=>{submitLinks()}} className='disabled:bg-slate-500 p-5 py-2 mx-2 w-fit my-5 hover:bg-slate-700 transition-all bg-slate-900 text-white font-bold rounded-3xl'>Create your BitTree</button>
            </div>
          </div>
          {generated && <>
          <div className='flex flex-col'>
        <span className={`${poppins.className} font-bold text-lg`}>Generated BitTree : </span>
        <code>
          <Link className='font-bold text-blue-600 transition-all hover:text-[17px]' target="_blank" href={generated}>{generated}</Link>
        </code>

          </div>
      </>}
        </div>
      </div>
      <div className="col2 w-full h-screen bg-[#E9C0E9]">
        <img className='h-full object-contain' src="/generate.png" alt="Generate your links" />
        <ToastContainer />
      </div>
    </div>
  )
}

export default Generate