import Link from 'next/link'
import MyHead from '../components/MyHead'
import NavBar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <NavBar />
      <MyHead
        title="Linkly"
        description="Welcome to Linkly, a place to share your links with others!"
        image="/images/tree.svg"
        url="/"
      />

      <main>
        <section className='flex flex-row text-white justify-evenly flex-none items-center px-20'>
          <div>
            <h1 className='text-5xl mb-10 text-cyan-300'>The only link sharing platform you will ever need</h1>
            <h5 className='text-2xl mb-5'>Claim your username today!</h5>
            <div className='bg-[#020d24] w-min flex items-center p-5 rounded-full'>
              <h1 className='font-bold mr-1 text-lg'>linkly.com/</h1>
              <input type="text" className='bg-transparent focus:outline-none w-28' placeholder='username'/>
              <button className='bg-cyan-500 py-2 px-6 rounded-full hover:bg-cyan-600 hover:scale-110 hover:-rotate-2 transiton-all duration-300'><Link href="/register">Claim!</Link></button>
            </div>
          </div>
          <div className='w-1/2'>
            <img src="https://linkr.com/img/slogan_posts.3d921988.png" className='w-full' />
          </div>
        </section>
        <section className='flex flex-row bg-slate-950 bg-opcaity-5 text-white'>
        </section>
      </main>
    </>
  )
}
