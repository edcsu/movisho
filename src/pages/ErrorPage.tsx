import { useRouteError } from "react-router-dom"
import Header from "../components/UI/Header"
import notFoundImage from "../assets/pagenotfound.svg"
import serverErrorImage from "../assets/servererror.svg"
import { ThemeProvider } from "../context/ThemeContext"
import Footer from "../components/UI/Footer"

const ErrorPage = () => {
  const error = useRouteError()

  let title = "An error occured!"
  let message = "Something went wrong"
  let image = serverErrorImage
  if (error.status === 500) {
    message = JSON.parse(error.data).message
  }

  if (error.status === 404) {
    title = "Not found"
    message = "Could not find resource or page"
    image = notFoundImage
  }

  return (
    <ThemeProvider>
      <Header />
      <section className="bg-white lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white text-center">
            {title}
          </h1>
          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200 text-center">
            {message}
          </p>
        </div>
        <img src={image} alt={message} className="w-96 mx-auto" />
      </section>
      <Footer />
    </ThemeProvider>
  )
}

export default ErrorPage