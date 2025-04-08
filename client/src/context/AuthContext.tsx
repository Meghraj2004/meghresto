import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, registerUser, loginUser, logoutUser, loginWithGoogle } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const register = async (email: string, password: string, name: string) => {
    return await registerUser(email, password, name);
  };
  
  const login = async (email: string, password: string) => {
    return await loginUser(email, password);
  };
  
  const googleLogin = async () => {
    return await loginWithGoogle();
  };
  
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle: googleLogin,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
