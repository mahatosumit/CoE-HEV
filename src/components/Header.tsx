import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-xl' : 'shadow-md'
    }`} style={{ background: 'linear-gradient(90deg, #007bff, #0056b3)' }}>
      {/* Top Bar */}
      <div className="bg-blue-700 text-white py-2">
        <div className="container-custom flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+914258226500" className="hover:text-saffron transition-colors">
              <i className="fas fa-phone mr-2"></i>+91 42582 26500
            </a>
            <a href="mailto:principalkpriet@kpriet.ac.in" className="hover:text-saffron transition-colors hidden md:inline-flex">
              <i className="fas fa-envelope mr-2"></i>principalkpriet@kpriet.ac.in
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img 
                src="/assets/logo.png" 
                alt="KPRIET Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <span className="block text-lg md:text-2xl font-bold leading-tight">
                  Centre of Excellence
                </span>
                <p className="text-xs md:text-sm opacity-90">
                  Hybrid & Electric Vehicles
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-white/20 text-white'
                      : 'hover:bg-white/10 text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/register"
                className="ml-2 px-6 py-2 bg-saffron hover:bg-green text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Register
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-900 text-white animate-slide-in">
          <nav className="container-custom py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/register"
              className="px-4 py-3 bg-saffron hover:bg-green text-white rounded-lg font-semibold text-center transition-all duration-300 mt-2"
            >
              Register Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
