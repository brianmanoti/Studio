import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
        Welcome to Our Platform
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8">
        This is the home page built with <span className="font-semibold">React</span> 
        and <span className="font-semibold">Tailwind CSS</span>. 
        Explore the site to learn more or access your dashboard.
      </p>

      <div className="flex gap-4">
        <Link
          to="/about"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Learn More
        </Link>
        <Link
          to="/dashboard"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
