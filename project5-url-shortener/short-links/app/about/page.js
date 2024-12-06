import React from 'react'
import localFont from 'next/font/local'
import Image from 'next/image';

const poppins = localFont({
    src: "../fonts/Poppins-ExtraBold.ttf",
    variable: "--font-poppins",
    weight: "100 900",
  });

const About = () => {
  return (
    <div className='p-2 flex flex-col bg-slate-200 '>
        <section className="grid grid-cols-2 h-[60vh]">
        <div className='flex flex-col gap-3 p-5'>
        <h1 className={`text-3xl font-bold ${poppins.className}`}>About...</h1>
        <p className='text-xl'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia amet asperiores velit, voluptatum odio totam nihil, repellendus quo voluptas rem beatae aspernatur facere nemo perferendis recusandae architecto corporis atque ex? Dignissimos tenetur reiciendis provident architecto, vitae officiis, cumque minima aliquid consequuntur qui cupiditate!
        </p>
        </div>
        <div className='flex justify-start relative'>
            <Image className="mix-blend-darken" alt="an image of a vector" src={"/vector.jpg"} fill={true}/>
        </div>
        </section>
    </div>
  )
}

export default About
