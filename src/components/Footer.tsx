import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/courses', label: 'Courses' },
    { path: '/events', label: 'Events' },
  ];

  const resources = [
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
    { path: '/register', label: 'Register' },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-saffron">COE - HEV</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Centre of Excellence for Hybrid & Electric Vehicles at KPRIET, 
              dedicated to advancing sustainable transportation technology and education.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-saffron rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-saffron transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="text-xs">▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-saffron transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="text-xs">▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://kpriet.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-saffron transition-colors duration-300 text-sm flex items-center gap-2"
                >
                  <span className="text-xs">▸</span>
                  KPRIET Website
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-saffron flex-shrink-0 mt-0.5" />
                <span>
                  KPR Institute of Engineering and Technology,
                  Coimbatore - 641 407
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-saffron flex-shrink-0" />
                <a href="tel:+914258226500" className="hover:text-saffron transition-colors">
                  +91 42582 26500
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-saffron flex-shrink-0" />
                <a href="mailto:principalkpriet@kpriet.ac.in" className="hover:text-saffron transition-colors break-all">
                  principalkpriet@kpriet.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/70">
          <p>
            © {new Date().getFullYear()} Centre of Excellence - Hybrid & Electric Vehicles, KPRIET. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
