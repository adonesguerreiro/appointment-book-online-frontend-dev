import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { authMe } from "../services/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const refreshUser = async () => {
		try {
			const res = await authMe();
			setUser(res.data);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		refreshUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, refreshUser }}>
			{children}
		</AuthContext.Provider>
	);
};
