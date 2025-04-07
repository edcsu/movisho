import { Outlet } from 'react-router'
import Header from '../components/UI/Header'
import Footer from '../components/UI/Footer'

const RootLayout = () => {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer/>
    </>
  )
}

export default RootLayout