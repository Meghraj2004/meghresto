import Slider from "../components/Slider";
import Menu from "../components/Menu";
import ReservationForm from "../components/ReservationForm";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <div>
      {/* Hero Slider */}
      <Slider />
      
      {/* About Section */}
      <section className="py-16 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">Discover the authentic flavors of India at MeghResto</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-500 shadow-lg order-2 md:order-1">
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">A Taste of Tradition</h3>
              <p className="text-gray-600 mb-4">Founded in 2015, MeghResto brings the rich and diverse culinary heritage of India to your table. Our recipes have been passed down through generations, preserving the authentic flavors and cooking techniques that make Indian cuisine so beloved worldwide.</p>
              <p className="text-gray-600 mb-4">Our chefs, trained in the finest culinary traditions of various Indian regions, craft each dish with care using premium spices imported directly from India. We believe in honoring tradition while embracing innovation, creating an unforgettable dining experience.</p>
              <div className="flex items-center mt-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=150&auto=format&fit=crop" alt="Chef portrait" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Chef Rajesh Sharma</p>
                  <p className="text-sm text-gray-600">Executive Chef</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop" alt="Restaurant interior" className="w-full h-[400px] object-cover transform hover:scale-105 transition duration-500" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <Menu />
      
      {/* Reservation Section */}
      <section className="py-16 bg-white relative" id="reservations">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=250&auto=format&fit=crop')` }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">Book A Table</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">Reserve your special dining experience with us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-amber-50 p-8 rounded-lg border border-amber-500 shadow-lg">
              <ReservationForm />
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Opening Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Monday - Thursday</span>
                    <span>12:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Friday - Saturday</span>
                    <span>12:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Sunday</span>
                    <span>12:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" alt="Restaurant interior" className="w-full h-[300px] object-cover transform hover:scale-105 transition duration-500" />
              </div>
              
              <div className="bg-green-700 p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-2xl font-playfair font-bold mb-4">Private Events</h3>
                <p className="mb-4">Looking to host a special celebration or corporate event? We offer private dining options tailored to your needs.</p>
                <a href="#contact" className="inline-block bg-white text-green-700 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition duration-300">
                  Inquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-amber-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">We'd love to hear from you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ContactForm />
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-amber-500 p-2 rounded-full text-white">
                      <i className="ri-map-pin-line text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Address</h4>
                      <p className="text-gray-600">123 Spice Street, Mumbai, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-amber-500 p-2 rounded-full text-white">
                      <i className="ri-phone-line text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 94216 12110</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-amber-500 p-2 rounded-full text-white">
                      <i className="ri-mail-line text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Email</h4>
                      <p className="text-gray-600">info@meghresto.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg h-[300px] bg-gray-300">
                {/* Map placeholder - would be replaced with actual map component */}
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="text-center p-4">
                    <i className="ri-map-2-line text-4xl text-gray-500 mb-2"></i>
                    <p className="text-gray-700">123 Spice Street, Mumbai, India</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-playfair font-bold text-gray-800 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition duration-300">
                    <i className="ri-facebook-fill text-xl"></i>
                  </a>
                  <a href="#" className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-full transition duration-300">
                    <i className="ri-instagram-line text-xl"></i>
                  </a>
                  <a href="#" className="bg-green-700 hover:bg-green-800 text-white p-3 rounded-full transition duration-300">
                    <i className="ri-twitter-x-line text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
