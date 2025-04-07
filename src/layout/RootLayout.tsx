import { Outlet } from 'react-router'
import Header from '../components/UI/Header'
import Footer from '../components/UI/Footer'

const RootLayout = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout