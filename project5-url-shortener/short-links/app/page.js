import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-slate-200">
      <section className="grid grid-cols-2 h-[60vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className={`text-3xl font-bold ${poppins.className}`}>
            The best url shortner in the market
          </p>
          <p className="px-44 text-center">
            We are the most straightforward url shortner in the world. Most of the url shortners will track you or ask you to give your details for login, we understand your needs and hence we have created this URL Shortner.
          </p>
          <div className='flex gap-3'>
            <Link href="/shorten" className='bg-slate-700 hover:bg-slate-600  transition-all text-white shadow-lg rounded-lg p-3 py-2 font-bold'><button>Try Now</button></Link>
            <Link href="/github" className='bg-slate-700 hover:bg-slate-600  transition-all text-white shadow-lg rounded-lg p-3 py-2 font-bold'><button>GitHub</button></Link>
          </div>
        </div>
        <div className="flex justify-start relative">
          <Image className="mix-blend-darken" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw" priority={true} alt="an image of a vector" src={"/vector.jpg"} fill={true} />

        </div>
      </section>
    </main>
  );
}
