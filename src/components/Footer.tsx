import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Logo className="mb-4 text-secondary-foreground" />
            <p className="text-sm opacity-90">
              Turning Your Moments into Lifetime Memories. Professional event management for all your special occasions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm opacity-90 hover:opacity-100 smooth-transition">
                Home
              </Link>
              <Link to="/services" className="text-sm opacity-90 hover:opacity-100 smooth-transition">
                Services
              </Link>
              <Link to="/about" className="text-sm opacity-90 hover:opacity-100 smooth-transition">
                About Us
              </Link>
              <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 smooth-transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Our Services</h3>
            <div className="flex flex-col gap-2">
              <p className="text-sm opacity-90">Marriage Events</p>
              <p className="text-sm opacity-90">Concert Management</p>
              <p className="text-sm opacity-90">Navratri Celebrations</p>
              <p className="text-sm opacity-90">Corporate Inaugurations</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Get In Touch</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 smooth-transition">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@handmevents.com" className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 smooth-transition">
                <Mail size={16} />
                <span>info@handmevents.com</span>
              </a>
              <p className="flex items-center gap-2 text-sm opacity-90">
                <MapPin size={16} />
                <span>Mumbai, Maharashtra, India</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 smooth-transition">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 smooth-transition">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 smooth-transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>© {new Date().getFullYear()} HandM Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
