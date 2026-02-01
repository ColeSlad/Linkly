import { useEffect, useState } from 'react';
import styles from "../styles/apply.module.css"
import Footer from '@/components/Footer';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from '@/components/Navbar';
import MyHead from '@/components/MyHead';
import { API_URL } from '../lib/api';
import ServerLoading from '../components/ServerLoading';

const Register = () => {

  // Redirect if already logged in
  useEffect(() => {
    if(localStorage.getItem('LinkTreeToken')) return window.location.href = "/dashboard";
  }, [])

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [category, setCategory] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (e) => {
    if(category !== e.target.value) {
      setCategory(e.target.value);
    }
    else {
      setCategory('');
    }

  }

  const handleRegister = (e) => {
    e.preventDefault();
    if(!category) return toast.error('Please select an account type!',
    {
      position: "bottom-right",
      theme: "dark"
    })

    setIsLoading(true);
    fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        category
      })
    }).then(res => res.json())
    .then((data) => {
      setIsLoading(false);

      if(data.status === 'error') {
        toast.error(data.message, {
          position: 'bottom-right',
          theme: 'dark'
        })
      }

      if(data.status === 'success') {
        toast.success('You have been registered successfully',
        {
          position: "bottom-right",
          theme: "dark",
        })
        localStorage.setItem('LinkTreeToken', data.token);
        setSubmitted(true);
        router.push('/login')
      }
      }).catch((err) => {
        setIsLoading(false);
        toast.error(err.message,
        {
          position: "bottom-right",
          theme: "dark",
        }
        )
      })

  }

  const toggleShowPassword = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <>
      <ServerLoading isLoading={isLoading} />
      <NavBar />
      <MyHead
        title="Register | Linkly"
        description="Register an account to Linkly"
        image="/images/favicon.ico"
        url="/register"
      />
      <section className={styles.background + " min-h-screen flex justify-center items-center"}>
        <div className="main">
          <div className="content bg-gray-950 text-white border-cyan-800 border-2 px-6 py-8 rounded-2xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center">Join the top creators</h1>
            <p className="text-center">Share links for your brand</p>
            <p className="text-center text-cyan-400 font-bold text-lg py-2">Start building your link hub 👇</p>
            <form className="flex flex-col gap-4 my-3 text-lg" onSubmit={handleRegister}>
              <span className="flex flex-row shadow-md border-2 px-2 py-3 rounded-md">
                <img className="w-5 mr-2" src="./svg/instagram.svg" alt=""/>
                <input value={username} name="display-name" type="text" placeholder="Enter a username..." className='bg-gray-950 focus:outline-none w-full' onChange={(e) => setUsername(e.target.value)} required/>
              </span>
              <span className="flex flex-row shadow-md border-2 px-2 py-3 rounded-md">
                <img className="w-5 mr-2" src="./svg/email.svg" alt=""/>
                <input value={email} name="email" type="email" placeholder="Enter your email..." className='bg-gray-950 focus:outline-none w-full' onChange={(e) => setEmail(e.target.value)} required/>
              </span>
              <span className="flex flex-row shadow-md border-2 px-2 py-3 rounded-md">
                <img className="w-5 mr-2" src="./svg/password.svg" alt=""/>
                <input value={password} name="password" type={passwordShown ? "text" : "password"} placeholder="Choose a password..." className='bg-gray-950 focus:outline-none w-full' onChange={(e) => setPassword(e.target.value)} required/>
              </span>
              <span className="flex flex-row w-fit hover:cursor-pointer" onClick={toggleShowPassword}>
                <input type="checkbox" className="hover:cursor-pointer" checked={passwordShown} onChange={toggleShowPassword}/>
                <h5 className="ml-2">Show Password</h5>
              </span>

              <h5 className="text-center text-sm text-cyan-600">Account Type:</h5>
              <span className="flex">
                <label className="flex flex-row mr-3 hover:cursor-pointer">
                  <input className="hover:cursor-pointer" type="checkbox" checked={category==="creator"} value="creator" onChange={handleCategoryChange}/>
                  <p className="pl-2">Creator</p>
                </label>
                <label className="flex flex-row mr-3 hover:cursor-pointer">
                  <input className="hover:cursor-pointer" type="checkbox" checked={category==="agency"} value="agency" onChange={handleCategoryChange}/>
                  <p className="pl-2">Agency</p>
                </label>
                <label className="flex flex-row mr-3 hover:cursor-pointer">
                  <input className="hover:cursor-pointer" type="checkbox" checked={category==="brand"} value="brand" onChange={handleCategoryChange}/>
                  <p className="pl-2">Brand</p>
                </label>
              </span>
              <input className="bg-cyan-500 text-white py-2 rounded-lg cursor-pointer hover:shadow-md hover:bg-[#04a5c2] hover:text-xl active:bg-cyan-600 active:shadow-md active:text-xl transition-all duration-400" type="submit" value="Register" />
            </form>
          </div>
          <h5 className="mt-5 text-center text-gray-200">Already have an account? <Link className="text-cyan-300 hover:text-cyan-400" href="/login">Login Here</Link></h5>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Register