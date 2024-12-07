
import Link from "next/link"
import localFont from "next/font/local";
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

const poppins = localFont({
    src: "../fonts/Poppins-ExtraBold.ttf",
    variable: "--font-geist-sans",
    weight: "100 900",
  });

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("linktree")
    const collection = db.collection("links")

    // If the handle is already claimed, you cannot create the bitTree
    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }
    return <div className="flex min-h-screen bg-gradient-to-l from-green-500 via-rose-500 to-green-500 justify-center items-start py-10">
        {item && <div className="photo flex justify-center flex-col items-center gap-4"> 
            <img className="rounded-[55px] h-28 " src={item.pic} alt="" />
            <span className={`font-bold text-xl ${poppins.className}`}>@{item.handle}</span>
            <span className="desc w-80 text-center text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-black via-slate-600 to-black">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index)=>{
                    return <Link  key={index} href= {item.link}><div className="bg-yellow-300 text-slate-800 text-[17px] py-4 font-semibold shadow-lg px-2 min-w-96 flex justify-center rounded-md my-3">
                       {item.linktext}
                       
                    </div></Link> 
                })}
            </div>
      </div>}
    </div>
}
