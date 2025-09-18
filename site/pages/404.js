import NavBar from "@/components/Navbar";
import Head from "next/head";
import Link from 'next/link'

export default function Custom404() {
    return(
        <>
        <NavBar />
        <Head>
            <title>404 Page not found</title>
            <meta name="My site" content="Content not found" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <div className="w-auto max-w-3xl bg-transparent rounded-xl m-auto my-20 pb-10 text-white text-center">
            <img className="w-full md:w-8/12 m-auto rounded-xl" src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Emoticon_Face_Frown_GE.png" alt=""/>
            <p className="font-mono text-xl md:text-2xl py-5 md:py-10">Sorry, The page you are looking for can't be found</p>            
            <Link href="/" className="bg-cyan-400 py-2 px-4 rounded-md text-2xl hover:bg-cyan-800 hover:text-white transition-all duration-300" style={{fontFamily:"poppins", fontWeight:"500"}}>Homepage</Link>
        </div>
        </>
    )
}