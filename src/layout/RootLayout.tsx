import { Outlet } from 'react-router'
import Header from '../components/UI/Header'
import Footer from '../components/UI/Footer'
import { ThemeProvider } from '../context/ThemeContext'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-grow dark:bg-gray-500'>
              <Outlet />
          </main>
          <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default RootLayout