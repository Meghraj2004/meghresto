const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-indian-red text-3xl"><i className="ri-restaurant-line"></i></span>
              <h3 className="font-playfair font-bold text-2xl ml-2">Megh<span className="text-saffron">Resto</span></h3>
            </div>
            <p className="text-gray-400 mb-6">Taste the Essence of India</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
              <li><a href="/#menu" className="text-gray-400 hover:text-white transition duration-300">Menu</a></li>
              <li><a href="/#reservations" className="text-gray-400 hover:text-white transition duration-300">Reservations</a></li>
              <li><a href="/#about" className="text-gray-400 hover:text-white transition duration-300">About</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-map-pin-line text-saffron mt-1 mr-3"></i>
                <span className="text-gray-400">123 Spice Street, Mumbai, India</span>
              </li>
              <li className="flex items-start">
                <i className="ri-phone-line text-saffron mt-1 mr-3"></i>
                <span className="text-gray-400">+91 94216 12110</span>
              </li>
              <li className="flex items-start">
                <i className="ri-mail-line text-saffron mt-1 mr-3"></i>
                <span className="text-gray-400">info@meghresto.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Monday - Thursday</span>
                <span className="text-gray-400">12:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Friday - Saturday</span>
                <span className="text-gray-400">12:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-400">12:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MeghResto. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
