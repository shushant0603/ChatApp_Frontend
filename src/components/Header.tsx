import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { href: "#", label: "Demos" },
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Pages" },
    { href: "#", label: "Contact" },
  ];
  const handleLogin = () => {
    // Implement login logic here
    navigate("/login");
    
  }

  return (
    <header className="fixed w-full bg-white z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-4xl font-bold text-orange-500">Apex</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 text-md font-medium transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogin}
            className="text-gray-700 hover:text-gray-900 hover:bg-pink-300 px-7 py-3 rounded-md   text-md font-medium transition"
          >
            Login
          </button>
          <button className="bg-apex-orange text-white px-7 py-3 rounded-lg text-sm font-medium bg-orange-500   transition">
            Get Started Free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden p-2"
>
  {mobileMenuOpen ? (
    <HiX className="w-6 h-6 text-gray-700" />
  ) : (
    <HiOutlineMenu className="w-6 h-6 text-gray-700" />
  )}
</button>

      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-500 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 text-sm font-medium"
          >
            Login
          </a>
          <button className="bg-apex-orange text-white bg-orange-500 px-6 py-2 rounded text-sm font-medium transition w-full">
            Get Started Free
          </button>
        </div>
      )}
    </header>
  );
}
