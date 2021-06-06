import { createContext, useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Authservice from "../Services/AuthService";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Authservice.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"500px"}}>
          <CircularProgress size={80}/>
        </div>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthProvider;
