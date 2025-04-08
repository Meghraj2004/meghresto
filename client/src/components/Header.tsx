import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Auth from "./Auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Handle scroll event to add shadow on navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <nav className={`sticky top-0 z-50 bg-white ${scrolled ? 'shadow-md' : ''} transition-shadow`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <span className="text-indian-red text-3xl"><i className="ri-restaurant-line"></i></span>
                  <h1 className="font-playfair font-bold text-2xl ml-2 text-gray-800">Megh<span className="text-saffron">Resto</span></h1>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks currentPath={location} />
          </div>
          
          {/* User Info / Login Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+919421612110" className="text-green-700 hover:text-saffron transition-colors duration-200 flex items-center">
              <i className="ri-phone-line mr-1"></i>
              <span>+91 94216 12110</span>
            </a>
            
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Button 
                variant="secondary" 
                onClick={() => setShowAuthModal(true)}
                className="bg-saffron text-white hover:bg-amber-600"
              >
                Sign In
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full py-6">
                  <Link href="/">
                    <div className="flex items-center mb-6">
                      <span className="text-indian-red text-3xl"><i className="ri-restaurant-line"></i></span>
                      <h1 className="font-playfair font-bold text-xl ml-2">Megh<span className="text-saffron">Resto</span></h1>
                    </div>
                  </Link>
                  
                  <nav className="flex flex-col space-y-3 mb-6">
                    <MobileNavLinks currentPath={location} />
                  </nav>
                  
                  <div className="mt-auto">
                    <a href="tel:+919421612110" className="flex items-center text-green-700 mb-4">
                      <i className="ri-phone-line mr-2"></i>
                      <span>+91 94216 12110</span>
                    </a>
                    
                    {user ? (
                      <div className="flex flex-col space-y-2">
                        <div className="text-sm text-gray-600 mb-1">
                          Signed in as <span className="font-medium">{user.displayName}</span>
                        </div>
                        <Link href="/my-reservations">
                          <Button variant="outline" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" /> My Reservations
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          className="w-full justify-start"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full bg-saffron hover:bg-amber-600 text-white"
                        onClick={() => setShowAuthModal(true)}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Auth modal */}
      <Auth open={showAuthModal} onOpenChange={setShowAuthModal} />
    </nav>
  );
};

const NavLinks = ({ currentPath }: { currentPath: string }) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/#menu", label: "Menu" },
    { path: "/#reservations", label: "Reservations" },
    { path: "/#about", label: "About" },
    { path: "/#contact", label: "Contact" }
  ];
  
  return (
    <>
      {links.map((link) => (
        <a 
          key={link.path} 
          href={link.path}
          className={`
            ${currentPath === link.path ? 'text-gray-800 border-b-2 border-saffron' : 'text-gray-600'} 
            hover:text-saffron font-medium transition-colors duration-200
          `}
        >
          {link.label}
        </a>
      ))}
    </>
  );
};

const MobileNavLinks = ({ currentPath }: { currentPath: string }) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/#menu", label: "Menu" },
    { path: "/#reservations", label: "Reservations" },
    { path: "/#about", label: "About" },
    { path: "/#contact", label: "Contact" }
  ];
  
  return (
    <>
      {links.map((link) => (
        <a 
          key={link.path} 
          href={link.path}
          className={`
            ${currentPath === link.path 
              ? 'px-3 py-2 text-base font-medium text-gray-800 border-l-4 border-saffron bg-amber-50' 
              : 'px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50'}
          `}
        >
          {link.label}
        </a>
      ))}
    </>
  );
};

const UserDropdown = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <span>{user.displayName}</span>
          <i className="ri-arrow-down-s-line"></i>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/my-reservations">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>My Reservations</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
