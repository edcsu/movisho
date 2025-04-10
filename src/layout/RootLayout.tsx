import { Outlet, ScrollRestoration } from 'react-router'
import Header from '../components/UI/Header'
import Footer from '../components/UI/Footer'
import { ThemeProvider } from '../context/ThemeContext'
import { Analytics } from '@vercel/analytics/react'
import ScrollToTop from '../components/ScrollToTop'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-grow dark:bg-gray-600'>
              <Outlet />
          </main>
          <Footer/>
          <ScrollToTop />
          <ScrollRestoration />
          <Analytics />
      </div>
    </ThemeProvider>
  )
}

export default RootLayout