import { useEffect, useState } from 'react'

function Navbar() {
  const [mode, setMode] = useState('light');
  const [scrollvalue, setScrollvalue] = useState(0)

  const changeTheme = () => {
    const html = document.documentElement;
    if(mode === 'light'){
      html.classList.remove('light')
      html.classList.add('dark')
      setMode('dark')
      localStorage.setItem('mode','dark')
    }else{
      html.classList.remove('dark')
      html.classList.add('light')
      setMode('light')
      localStorage.setItem('mode', 'light')
    }
  }

  useEffect( () => {
    const currentMode = localStorage.getItem('mode') || 'light';
    document.documentElement.classList.add(currentMode);
    setMode(currentMode);
  } , [])

  const listenScrollEvent = () => {
    setScrollvalue(window.scrollY)
  }

  useEffect( () => {
    const scroll = window.addEventListener("scroll", listenScrollEvent);
    return () => scroll;
  } , [])

  return (
    <div className='h-[180vh]'>
      <nav className={scrollvalue > 10 ? 'sticky top-0 bg-green-600 text-black flex justify-center items-center h-20 w-full' : 'sticky top-0 dark:text-white text-black flex justify-center items-center h-20 w-full'}>
      <ul className='list flex justify-center items-center space-x-4'>
        <li>Home</li>
        <li>About</li>
        <li>Project</li>
        <li>Skills</li>
        <li>Contact </li>
      </ul>
    </nav><h1 className='p-5 text-4xl font-bold dark:text-white'>React Dark Mode</h1><div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <div>
          <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
          </span>
        </div>
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
        </p>
      </div><button onClick={changeTheme} className='px-3 py-2 text-white bg-black rounded-lg mt-10'>
        Mode {mode == 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}

export default Navbar;