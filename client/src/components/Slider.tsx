import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  image: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: 'primary' | 'secondary' | 'destructive';
}

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: Slide[] = [
    {
      image: "https://images.unsplash.com/photo-1585937421612-70a008356cf4?q=80&w=1920&auto=format&fit=crop",
      title: "Experience Authentic",
      highlight: "Indian Cuisine",
      description: "Embark on a culinary journey through the flavors of India",
      buttonText: "Book A Table",
      buttonLink: "#reservations",
      buttonVariant: 'primary'
    },
    {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop",
      title: "Elegant",
      highlight: "Dining Experience",
      description: "Join us for a memorable evening in our beautifully decorated space",
      buttonText: "View Our Menu",
      buttonLink: "#menu",
      buttonVariant: 'secondary'
    },
    {
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=1920&auto=format&fit=crop",
      title: "Expertly Crafted",
      highlight: "Delicacies",
      description: "Savor our chef's special creations made with authentic spices",
      buttonText: "Contact Us",
      buttonLink: "#contact",
      buttonVariant: 'destructive'
    }
  ];
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center bg-no-repeat`}
          style={{ 
            backgroundImage: `url(${slide.image})`,
            opacity: currentSlide === index ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                {slide.title} <span className="text-amber-300">{slide.highlight}</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{slide.description}</p>
              <a 
                href={slide.buttonLink} 
                className={`
                  inline-block font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105
                  ${slide.buttonVariant === 'primary' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 
                    slide.buttonVariant === 'secondary' ? 'bg-green-700 hover:bg-green-800 text-white' :
                    'bg-red-700 hover:bg-red-800 text-white'}
                `}
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}
      
      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full bg-white focus:outline-none transition-opacity duration-300 ${
              currentSlide === index ? 'opacity-100' : 'opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
