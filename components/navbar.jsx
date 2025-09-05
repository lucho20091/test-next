"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function navbar() {
  const { data: session } = useSession();
  const isSignedIn = session?.user ? true : false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log(session);
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-500">SocialFeed</h1>
          </Link>

          {/* Desktop Navigation - Not Signed In */}
          {!isSignedIn && (
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Desktop Navigation - Signed In */}
          {isSignedIn && (
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href={`/profile/${session?.user?.username}`}
                className="flex items-center space-x-2"
              >
                <img
                  src={session?.user?.image}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span
                  href={`/profile/${session?.user?.username}`}
                  className="text-gray-700 text-sm font-medium"
                >
                  {session?.user?.username}
                </span>
              </Link>
              <button
                onClick={signOut}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {/* Mobile Navigation - Not Signed In */}
            {!isSignedIn && (
              <>
                <Link
                  href="/"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-base font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Navigation - Signed In */}
            {isSignedIn && (
              <>
                <Link
                  href="/"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href={`/profile/${session?.user?.username}`}
                  className="flex items-center px-3 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    src={session?.user?.image}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {session?.user?.username}
                  </span>
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// <nav>
//   <Link href="/">Home</Link>
//   <Link href="/login">Login</Link>
//   <Link href="/register">Register</Link>
//   {isSignedIn && <button onClick={() => signOut()}>Sign Out</button>}
// </nav>
