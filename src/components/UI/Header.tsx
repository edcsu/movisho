import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
const Header = () => {
  const linkClasses = 'text-gray-500 transition hover:text-gray-500/75'
  const activeClasses = 'text-blue-500 transition hover:text-gray-500/75'
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <NavLink to='/'>
              <span className="sr-only">Home</span>
              <div className='flex items-center'>
                <img className='h-12' src={logo} alt='logo' />
                <span className="text-gray-500">Movisho</span>
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
                    Home 
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="movies/popular"
                  > 
                    Popular 
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="movies/top"
                    > 
                    Top rated 
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? activeClasses : linkClasses
                    }
                    to="movies/upcoming"
                  > 
                    Upcoming 
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form action="">
              <label htmlFor="search">
                <div className="relative rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
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
        </div>
      </div>
    </header>
  )
}

export default Header