"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")

  
  const createTree = () => { 
    
    router.push(`/generate?handle=${text}`)
  }
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2 pt-24">
    <div className="flex justify-center flex-col ml-[10vw] gap-3">
      <p className="text-yellow-300 font-bold text-7xl">Everything you </p>
      <p className="text-yellow-300 font-bold text-7xl">are. In one,</p>
      <p className="text-yellow-300 font-bold text-7xl">simple link in bio.</p>
      <p className="text-yellow-300 text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
      <div className="input flex gap-2">
        <input value={text} onChange={(e)=> setText(e.target.value)} className="px-2 py-2 focus:outline-green-800 text-black font-semibold rounded-md" type="text" placeholder="Enter your Handle" />
        <button onClick={()=> createTree()} className="bg-yellow-400 hover:bg-yellow-300 text-black transition-all rounded-full px-4 py-4 font-semibold">Claim your BitTree</button>
      </div>
    </div>
    <div className="flex items-center justify-center flex-col mr-[10vw]">
      <img src="/home.png" alt="homepage image" />

    </div>
      </section>
      <section className="bg-[#e8c0e9] min-h-[100vh] grid grid-cols-2 ">
    <div className="flex items-center justify-center flex-col ml-[6vw]">
      <img src="/home2.png" alt="homepage image" />

    </div>
    <div className="flex justify-center flex-col mr-[10vw] gap-3">
      <p className="text-violet-900 font-extrabold text-6xl">Create and customize</p>
      <p className="text-violet-900 font-extrabold text-6xl">your LinkTree in</p>
      <p className="text-violet-900 font-extrabold text-6xl">minutes.</p>
      <p className="text-violet-900 text-xl my-4">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
      <div className="input flex gap-2">
        <input value={text} onChange={(e)=> setText(e.target.value)} className="px-2 py-2 focus:outline-pink-700 text-black font-semibold rounded-md" type="text" placeholder="Enter your Handle" />
        <button onClick={()=> createTree()} className="bg-violet-900 hover:bg-violet-800 transition-all rounded-full px-4 py-4 font-semibold">Claim your BitTree</button>
      </div>
    </div>
 
      </section>
    </main>
  );
}