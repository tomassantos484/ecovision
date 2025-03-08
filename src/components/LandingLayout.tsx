import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Github, Twitter, Heart, ArrowRight } from 'lucide-react';

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Use useLayoutEffect to ensure scroll position is set before browser paint
  useLayoutEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also set body scroll position
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);
  
  // Track scroll position to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll to a section
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pattern-bg flex flex-col">
      {/* Navbar - Landing page specific with section links */}
      <nav className={`w-full px-4 sm:px-6 lg:px-10 py-6 flex justify-between items-center fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/19d21855-df32-4986-8eba-bab60462047b.png" 
            alt="EcoVision Logo" 
            className="h-10"
          />
        </Link>
        
        <div className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className={`transition-colors ${
              scrolled ? 'text-gray-800 hover:text-eco-green' : 'text-eco-dark font-medium hover:text-eco-green'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/how-it-works" 
            className={`transition-colors ${
              scrolled ? 'text-gray-800 hover:text-eco-green' : 'text-eco-dark font-medium hover:text-eco-green'
            }`}
          >
            How It Works
          </Link>
          <Link 
            to="/features" 
            className={`transition-colors ${
              scrolled ? 'text-gray-800 hover:text-eco-green' : 'text-eco-dark font-medium hover:text-eco-green'
            }`}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${
              scrolled ? 'text-gray-800 hover:text-eco-green' : 'text-eco-dark font-medium hover:text-eco-green'
            }`}
          >
            About Us
          </Link>
          <Link to="/sign-in">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-eco-green text-white px-5 py-2 rounded-md flex items-center space-x-2"
            >
              <span>Sign In</span>
            </motion.button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-eco-dark p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* No padding needed since we're using min-h-screen for the hero */}
      
      <motion.main 
        className="flex-1 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      {/* CTA Section */}
      <section className="py-20 bg-eco-green/10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-medium text-eco-dark mb-6"
            >
              Ready to start your sustainability journey?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-eco-dark/80 mb-8"
            >
              Join thousands of eco-conscious individuals making a difference for our planet.
              Track your actions, measure your impact, and be part of the solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/sign-up">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-eco-green text-white px-8 py-3 rounded-full text-lg font-medium flex items-center mx-auto"
                >
                  <span>Get Started Now</span>
                  <ArrowRight size={18} className="ml-2" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 py-12 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo and description */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/19d21855-df32-4986-8eba-bab60462047b.png" 
                  alt="EcoVision Logo" 
                  className="h-8"
                />
              </Link>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track your sustainability journey and make a positive impact on the environment
              </p>
            </div>
            
            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-800">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#home" 
                    onClick={scrollToSection('home')}
                    className="text-sm text-gray-600 hover:text-eco-green transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-eco-green transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-sm text-gray-600 hover:text-eco-green transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-600 hover:text-eco-green transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Account Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-800">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/sign-in" className="text-sm text-gray-600 hover:text-eco-green transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" className="text-sm text-gray-600 hover:text-eco-green transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-800">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/tomassantos484/2025-hack-knight" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-eco-green transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com/TomasJSantosY" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-eco-green transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom copyright section */}
          <div className="flex flex-col md:flex-row md:justify-between items-center pt-8 mt-8 border-t border-gray-200 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} ecovision. all rights reserved.</p>
            <p className="flex items-center mt-4 md:mt-0">
              made with <Heart size={14} className="mx-1 text-eco-accent" /> for the planet <Leaf size={14} className="ml-1 text-eco-green" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout; 