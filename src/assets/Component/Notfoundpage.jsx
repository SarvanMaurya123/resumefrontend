
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="text-center bg-white p-10 w-full max-w-md">
                <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
                <p className="text-gray-500 mt-2">
                    The page you are looking for might have been moved or deleted.
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Go Back Home
                </Link>
                <p className="text-gray-400 mt-4">or</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
