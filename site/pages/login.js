import { useEffect, useState } from 'react';
import styles from "../styles/apply.module.css"
import Footer from '@/components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from '@/components/Navbar';
import MyHead from '@/components/MyHead';

const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('LinkTreeToken')) return window.location.href = "/dashboard";
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === "success") {
        toast.success('You have been logged in successfully', 
        {
          position: "bottom-right",
          theme: "dark",
        })
        localStorage.setItem('LinkTreeToken', data.token);
        router.push('/dashboard')
      }
      if(data.status === "not found") {
        toast.error('Email or Password is incorrect', 
        {
          position: "bottom-right",
          theme: "dark",
        })
      }
    }).catch((err) => {
      console.log(err);
    })

    
    setEmail('');
    setPassword('');
  }

  const toggleShowPassword = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <>
      <NavBar />
      <MyHead
        title="Login | Linkly"
        description="Login to Linkly"
        image="/images/favicon.ico"
        url="/login"
      />
      <section className={styles.background + " min-h-screen flex justify-center items-center"}>
        <div className="main">
          <div className="content bg-gray-950 text-white border-cyan-800 border-2 px-6 py-8 rounded-2xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center">Welcome Back!</h1>
            <p className="text-center">Log in to share links for your brand</p>
            <p className="text-center text-cyan-400 font-bold text-lg py-2">Continue building your link hub 👇</p>
            <form className="flex flex-col gap-4 my-3 text-lg" onSubmit={handleLogin}>
              <span className="flex flex-row shadow-md border-2 px-2 py-3 rounded-md">
                <img className="w-5 mr-2" src="./svg/email.svg" alt=""/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Enter your email..." className='bg-gray-950 focus:outline-none w-full' required/>
              </span>
              <span className="flex flex-row shadow-md border-2 px-2 py-3 rounded-md">
                <img className="w-5 mr-2" src="./svg/password.svg" alt=""/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type={passwordShown ? "text" : "password"} placeholder="Enter your password..." className='bg-gray-950 focus:outline-none w-full' required/>
              </span>
              <span className="flex flex-row w-fit hover:cursor-pointer" onClick={toggleShowPassword}>
                <input type="checkbox" className="hover:cursor-pointer" checked={passwordShown} onChange={toggleShowPassword}/>
                <h5 className="ml-2">Show Password</h5>
              </span>
              <input className="bg-cyan-500 text-white py-2 rounded-lg cursor-pointer hover:shadow-md hover:bg-[#04a5c2] hover:text-xl active:bg-cyan-600 active:shadow-md active:text-xl transition-all duration-400" type="submit" value="Login" />
            </form>
          </div>
          <h5 className="mt-5 text-center text-gray-200">Don't have an account with us? <Link className="text-cyan-300 hover:text-cyan-400" href="/register">Register Here</Link></h5>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Login