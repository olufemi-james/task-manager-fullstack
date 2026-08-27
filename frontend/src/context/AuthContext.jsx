import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restore session when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  //Login
  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);

    localStorage.setItem("token", response.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    setToken(response.token);
    setUser(response.user);
    setIsAuthenticated(true);

    return response;
  }, []);

  //Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};