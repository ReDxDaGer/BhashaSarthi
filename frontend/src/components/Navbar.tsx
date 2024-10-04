"use client";

import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../app/context/AuthContext"; // Import AuthContext

export default function Navbar() {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          BhashaSarthi
        </Link>
        <div className="space-x-6">
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>

          {/* Conditional rendering based on user authentication */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
