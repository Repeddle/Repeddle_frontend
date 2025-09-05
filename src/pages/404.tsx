import { Link } from "react-router-dom"
import { FaArrowLeft, FaHome, FaSearch } from "react-icons/fa"

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center dark:bg-dark-ev1 px-4 py-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-4">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-orange-color dark:text-orange-color opacity-80">
            404
          </h1>
        </div>

        <div className="mb-6">
          <div className="sm:w-24 sm:h-24 w-20 h-20 mx-auto bg-orange-color/10 dark:bg-orange-color/20 rounded-full flex items-center justify-center">
            <FaSearch className="sm:w-12 sm:h-12 w-10 h-10 text-orange-color" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black-color dark:text-white-color mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex gap-3 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-orange-color hover:bg-malon-color text-white-color px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <FaHome className="w-3 h-3" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-orange-color text-orange-color hover:bg-orange-color hover:text-white-color px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <FaArrowLeft className="w-3 h-3" />
            Go Back
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <Link
              to="/contact-Us"
              className="text-orange-color hover:text-malon-color underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
