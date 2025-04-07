import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import darkLogo from '../../assets/logodark.svg'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () =>{
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { isDark } = useTheme();
  const linkClasses = 'text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-blue-500/75'
  const activeClasses = 'text-blue-500 transition hover:text-gray-500/75'
  const activeMobile = "flex items-center gap-2 border-s-[3px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-500 bg-gray-300"
  const inactiveMobile ="flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 bg-gray-900 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(prevState => !prevState)
  }

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <NavLink to='/'>
              <span className="sr-only">Home</span>
              <div className='flex items-center'>
                {isDark ? (<img className='h-12' src={darkLogo} alt='logo' />) : (<img className='h-12' src={logo} alt='logo' />)}
                <span className="text-gray-500 text-2xl ml-2 dark:text-white dark:hover:text-white/75">Movisho</span>
              </div>
            </NavLink>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="/"
                    end
                  > 
                    <span className='text-base'>
                     Home 
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="movies/popular"
                  > 
                    <span className='text-base'>
                      Popular 
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="movies/top"
                    >
                    <span className='text-base'>
                      Top rated 
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="movies/upcoming"
                  > 
                    <span className='text-base'>
                      Upcoming 
                    </span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <form action="">
              <label htmlFor="search">
                <div className="relative rounded-md bg-white dark:bg-gray-300 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                  <input
                    name='search'
                    type="text"
                    id="search"
                    placeholder='Search'
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                  <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
                    <button
                      type="button"
                      aria-label="Submit"
                      className="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </label>
            </form>
          </div>

          <div className="block md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <span className="sr-only">Toggle</span>
              {!showMobileMenu && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                  <title>breadcrumb</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>)}
              {showMobileMenu && (
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <title>close-circle-outline</title>
                  <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (<div className="block md:hidden">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeMobile : inactiveMobile
              }
              to="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75 shadow-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>home</title>
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
              </svg>

              <span className="text-sm font-medium"> Home </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeMobile : inactiveMobile
              }
              to="/movies/popular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75 shadow-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>fire</title>
                <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" />
              </svg>

              <span className="text-sm font-medium"> Popular </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeMobile : inactiveMobile
              }
              to="/movies/top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75 shadow-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>star</title>
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
              </svg>

              <span className="text-sm font-medium"> Top rated </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeMobile : inactiveMobile
              }
              to="/movies/upcoming"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75 shadow-sm"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>trending-up</title>
                <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
              </svg>
              <span className="text-sm font-medium"> Upcoming </span>
            </NavLink>
          </li>
        </ul>
      </div>)}
    </header>
  )
}

export default Header