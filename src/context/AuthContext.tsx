import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
	token: string | null;
	setToken: (token: string | null) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setTokenState] = useState<string | null>(
		localStorage.getItem("token")
	);

	const setToken = (newToken: string | null) => {
		if (newToken) {
			localStorage.setItem("token", newToken);
		} else {
			localStorage.removeItem("token");
		}
		setTokenState(newToken);
	};

	const logout = () => {
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, setToken, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
