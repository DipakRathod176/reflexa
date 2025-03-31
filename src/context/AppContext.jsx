import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [loggedin, setLogged] = useState(false);
  const [userData, setUserData] = useState({name:'xyz',email:'abc@xyz.com',role:'student'});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken"))
          ?.split("=")[1];

        if (!token) {
          setLogged(false);
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: { "x-auth-token": token },
        });

        setUserData(response.data.profile);
        setLogged(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLogged(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AppContext.Provider value={{ theme, userData, loggedin, setLogged, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use the Context
export const useAppContext = () => {
  return useContext(AppContext);
};
