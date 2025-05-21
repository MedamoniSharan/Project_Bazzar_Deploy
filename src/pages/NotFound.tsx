import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animation404 from "./404_animation.json"; // adjust path as needed

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="w-72 sm:w-96 mb-6">
        <Lottie animationData={animation404} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
      <a
        href="/"
        className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;
